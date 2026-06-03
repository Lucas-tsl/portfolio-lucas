# Import issues from .github/issues.csv, create a Project board and add the issues to 'To do'.
# Usage (PowerShell):
#   $env:GITHUB_TOKEN = "ghp_xxxxxxxxx..."
#   .\scripts\import_issues.ps1

param()

$owner = "Lucas-tsl"
$repo = "portfolio-lucas"
$token = $env:GITHUB_TOKEN
if (-not $token) {
    Write-Error "GITHUB_TOKEN not set in environment. Set it with: $env:GITHUB_TOKEN = \"ghp_xxx\""
    exit 1
}

$csvPath = ".github\issues.csv"
if (-not (Test-Path $csvPath)) {
    Write-Error "issues.csv not found at $csvPath"
    exit 1
}

$csvRows = Import-Csv -Path $csvPath

# Build an index of existing open issues by title to avoid duplicates on reruns.
$existingByTitle = @{}
try {
    $existingIssues = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/issues?state=open&per_page=100" -Method Get -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ErrorAction Stop
    foreach ($ei in $existingIssues) {
        if ($ei.pull_request) { continue }
        $existingByTitle[$ei.title] = $ei
    }
} catch {
    Write-Warning "Could not fetch existing issues index: $($_.Exception.Message)"
}

# Ensure labels exist before assigning them to issues (GitHub returns 422 for unknown labels).
$labelColorMap = @{
    "enhancement" = "a2eeef"
    "bug" = "d73a4a"
    "chore" = "cfd3d7"
    "task" = "0052cc"
    "feature" = "0e8a16"
    "devops" = "5319e7"
}

$allLabels = @()
foreach ($row in $csvRows) {
    if ($row.labels -and $row.labels.Trim() -ne "") {
        $allLabels += ($row.labels -split ';' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })
    }
}
$allLabels = $allLabels | Sort-Object -Unique

foreach ($lbl in $allLabels) {
    $safeColor = if ($labelColorMap.ContainsKey($lbl)) { $labelColorMap[$lbl] } else { "ededed" }
    $labelPayload = @{ name = $lbl; color = $safeColor } | ConvertTo-Json -Depth 3
    try {
        Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/labels" -Method Post -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ContentType "application/json; charset=utf-8" -Body $labelPayload -ErrorAction Stop | Out-Null
        Write-Output "Created label: $lbl"
    } catch {
        # 422 here usually means label already exists, which is fine.
        Write-Output "Label exists or cannot be created now: $lbl"
    }
}

$issues = @()
foreach ($row in $csvRows) {
    $title = ($row.title | Out-String).Trim()
    $body = ($row.body | Out-String).Trim()
    $labelsRaw = $row.labels
    $labels = @()
    if ($labelsRaw -and $labelsRaw.Trim() -ne "") {
        $labels = ($labelsRaw -split ';' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })
    }

    $resp = $null
    if ($existingByTitle.ContainsKey($title)) {
        $resp = $existingByTitle[$title]
        Write-Output "Issue already exists #$($resp.number): $($resp.title)"
    } else {
        # Create issue first without labels to avoid 422 when labels are unknown/invalid.
        $payloadObject = @{ title = $title; body = $body }
        $payload = $payloadObject | ConvertTo-Json -Depth 6

        try {
            $resp = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/issues" -Method Post -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ContentType "application/json; charset=utf-8" -Body $payload -ErrorAction Stop
            Write-Output "Created issue #$($resp.number): $($resp.title)"
            $existingByTitle[$title] = $resp
        } catch {
            $statusCode = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { "unknown" }
            $errorBody = if ($_.ErrorDetails -and $_.ErrorDetails.Message) { $_.ErrorDetails.Message } else { "(unable to parse response body)" }
            Write-Error "Failed to create issue: $title - HTTP $statusCode - $($_.Exception.Message) - $errorBody"
            continue
        }
    }

    if ($labels.Count -gt 0) {
        try {
            # GitHub expects an object with a labels array.
            $labelsPayload = @{ labels = @($labels) } | ConvertTo-Json -Depth 4
            Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/issues/$($resp.number)/labels" -Method Post -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ContentType "application/json; charset=utf-8" -Body $labelsPayload -ErrorAction Stop | Out-Null
            Write-Output "Applied labels to issue #$($resp.number): $($labels -join ', ')"
        } catch {
            $labelErr = if ($_.ErrorDetails -and $_.ErrorDetails.Message) { $_.ErrorDetails.Message } else { $_.Exception.Message }
            Write-Warning "Failed to apply labels on issue #$($resp.number): $labelErr"
        }
    }

    $issues += $resp
}

# reuse existing project named 'Portfolio Board' if available, else create it
$proj = $null
$projectApiAvailable = $true
try {
    $existingProjects = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/projects?state=open&per_page=100" -Method Get -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github.inertia-preview+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ErrorAction Stop
    $proj = $existingProjects | Where-Object { $_.name -eq "Portfolio Board" } | Select-Object -First 1
} catch {
    $statusCode = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
    if ($statusCode -eq 404) {
        $projectApiAvailable = $false
        Write-Warning "Projects (classic) API not available (HTTP 404). Issues were created, board automation will be skipped."
    } else {
        Write-Warning "Could not list existing projects: $($_.Exception.Message)"
    }
}

if ($projectApiAvailable -and -not $proj) {
    $projPayload = @{ name = "Portfolio Board"; body = "Board pour suivre le backlog" } | ConvertTo-Json
    try {
        $proj = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/projects" -Method Post -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github.inertia-preview+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ContentType "application/json; charset=utf-8" -Body $projPayload -ErrorAction Stop
        Write-Output "Created project: $($proj.name) (id=$($proj.id))"
    } catch {
        $statusCode = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
        if ($statusCode -eq 404) {
            $projectApiAvailable = $false
            Write-Warning "Projects (classic) API returned 404 on create. Skipping board automation."
        } else {
            Write-Warning "Failed to create project: $($_.Exception.Message). Skipping board automation."
            $projectApiAvailable = $false
        }
    }
} elseif ($projectApiAvailable) {
    Write-Output "Using existing project: $($proj.name) (id=$($proj.id))"
}

if (-not $projectApiAvailable -or -not $proj) {
    Write-Output "Done. Issues and labels import completed. Create/add to a Project board manually in GitHub UI."
    exit 0
}

# create columns
$columnNames = @("To do","In progress","Done")
$columns = @{}

# index existing columns first
try {
    $existingColumns = Invoke-RestMethod -Uri "https://api.github.com/projects/$($proj.id)/columns?per_page=100" -Method Get -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github.inertia-preview+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ErrorAction Stop
    foreach ($ec in $existingColumns) {
        $columns[$ec.name] = $ec
    }
} catch {
    Write-Warning "Could not list existing columns: $($_.Exception.Message)"
}

foreach ($cn in $columnNames) {
    if ($columns.ContainsKey($cn)) {
        Write-Output "Using existing column: $cn (id=$($columns[$cn].id))"
        continue
    }

    $colPayload = @{ name = $cn } | ConvertTo-Json
    try {
        $col = Invoke-RestMethod -Uri "https://api.github.com/projects/$($proj.id)/columns" -Method Post -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github.inertia-preview+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ContentType "application/json; charset=utf-8" -Body $colPayload -ErrorAction Stop
        Write-Output "Created column: $($col.name) (id=$($col.id))"
        $columns[$cn] = $col
    } catch {
        Write-Error "Failed to create column $($cn): $($_.Exception.Message)"
    }
}

# add each issue to 'To do' column
$todoColId = $columns['To do'].id
if (-not $todoColId) {
    Write-Error "To do column not found"
    exit 1
}

foreach ($iss in $issues) {
    $cardPayload = @{ content_id = $iss.id; content_type = "Issue" } | ConvertTo-Json
    try {
        $card = Invoke-RestMethod -Uri "https://api.github.com/projects/columns/$todoColId/cards" -Method Post -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github.inertia-preview+json"; "User-Agent" = "PowerShell"; "X-GitHub-Api-Version" = "2022-11-28" } -ContentType "application/json; charset=utf-8" -Body $cardPayload -ErrorAction Stop
        Write-Output "Added issue #$($iss.number) to To do as card id $($card.id)"
    } catch {
        Write-Error "Failed to add issue #$($iss.number) to To do: $($_.Exception.Message)"
    }
}

Write-Output "Done."
