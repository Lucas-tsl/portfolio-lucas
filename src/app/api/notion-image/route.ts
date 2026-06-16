import { NextRequest } from "next/server";

const ALLOWED_HOSTS = [
  "s3.us-west-2.amazonaws.com",
  "prod-files-secure.s3.us-west-2.amazonaws.com",
  "secure.notion-static.com",
  "notion.so",
  "www.notion.so",
  "img.notionusercontent.com",
  "images.unsplash.com",
];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) return new Response("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (!ALLOWED_HOSTS.some((h) => parsed.hostname === h || parsed.hostname.endsWith("." + h))) {
    return new Response("Host not allowed", { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)" },
    });
    if (!res.ok) return new Response("Upstream error", { status: res.status });

    const contentType = res.headers.get("Content-Type") ?? "image/jpeg";
    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    });

    return new Response(res.body, { headers });
  } catch {
    return new Response("Failed to fetch image", { status: 502 });
  }
}
