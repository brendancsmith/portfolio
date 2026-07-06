#!/usr/bin/env node
// Smoke-test the static export: serve out/ the way Vercel does and assert each
// route returns HTTP 200 with its expected <title>. Run `npm run build` first.

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { startStaticServer } from "./static-server.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

// Each route must return 200 and contain its unique <title>, which confirms the
// correct page rendered — not just that some page responded.
const routes = [
  { path: "/", title: "Brendan C. Smith | Lead Data Scientist" },
  { path: "/resume", title: "Brendan C. Smith | Resume" },
  { path: "/resume-extended", title: "Brendan C. Smith | Resume (Extended)" },
];

if (!existsSync(join(outDir, "index.html"))) {
  console.error("out/index.html not found — run `npm run build` before the smoke test.");
  process.exit(1);
}

// Clean URLs + real 404s (no index fallback), so a genuinely broken route fails
// instead of silently serving index.html.
const { origin, close } = await startStaticServer(outDir, { cleanUrls: true });

try {
  const failures = [];
  for (const { path, title } of routes) {
    try {
      const res = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(5000) });
      const body = await res.text();
      if (res.status !== 200) {
        failures.push(`${path} → HTTP ${res.status} (expected 200)`);
      } else if (!body.includes(`<title>${title}</title>`)) {
        failures.push(`${path} → 200 but missing <title>${title}</title>`);
      } else {
        console.log(`✓ ${path} → 200, title "${title}"`);
      }
    } catch (err) {
      failures.push(`${path} → request failed: ${err.message}`);
    }
  }

  if (failures.length > 0) {
    console.error(`\nSmoke test failed:\n  ${failures.join("\n  ")}`);
    process.exitCode = 1;
  } else {
    console.log(`\nSmoke test passed: ${routes.length} routes OK.`);
  }
} finally {
  await close();
}
