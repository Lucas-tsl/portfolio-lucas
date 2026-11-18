import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Config minimale : pas d'incremental cache R2/KV pour l'instant
// (site essentiellement statique, pas d'ISR).
export default defineCloudflareConfig({});
