import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Cache en lecture seule servi depuis les assets statiques du Worker :
// les pages SSG (ex. /blog/[slug] avec dynamicParams = false) sont lues
// depuis le build, sans revalidation ni lecture fs au runtime.
// Si un jour on a besoin d'ISR/revalidation → passer au cache R2.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
