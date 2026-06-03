# Importer les issues dans GitHub

Utilise le fichier `issues.csv` situé dans `.github/` pour importer automatiquement les issues dans ton repository GitHub.

Étapes :

1. Crée un repository sur GitHub et pousse ton code (`git remote add origin ...` puis `git push -u origin main`).
2. Dans GitHub, va dans `Issues` > `Import issues` (ou utilise https://github.com/import/issues).
3. Téléverse `.github/issues.csv` ou copie-colle son contenu. Les colonnes supportées : `title,body,labels,assignee,milestone,state`.

Notes :
- Les étiquettes (labels) seront créées automatiquement si elles n'existent pas.
- Assignees doivent être des noms d'utilisateurs GitHub valides.
