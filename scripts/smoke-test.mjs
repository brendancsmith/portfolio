#!/usr/bin/env node
// Smoke-test the static export: serve out/ and assert each route returns HTTP
// 200 with its expected <title>. Run `npm run build` first to generate out/.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const port = Number(process.env.SMOKE_PORT ?? 4321);
const base = `http://127.0.0.1:${port}`;

// Each route must return 200 and contain its unique <title>, which confirms the
// correct page rendered — not just that some page responded.
const routes = [
  { path: "/", title: "Brendan C. Smith | Lead Data Scientist" },
  { path: "/resume", title: "Brendan C. Smith | Resume" },
  { path: "/resume-extended", title: "Brendan C. Smith | Resume (Extended)" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (!existsSync(join(outDir, "index.html"))) {
  console.error("out/index.html not found — run `npm run build` before the smoke test.");
  process.exit(1);
}

// Serve without --single so missing routes 404 instead of falling back to
// index.html, which would hide a genuinely broken route.
const server = spawn(
  join(root, "node_modules", ".bin", "serve"),
  [outDir, "-l", String(port), "--no-clipboard", "--no-port-switching"],
  { detached: true, stdio: "ignore" },
);
server.on("error", (err) => {
  console.error(`Failed to start static server: ${err.message}`);
  process.exit(1);
});

// Kill the whole process group so no orphan listener survives.
const stopServer = () => {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    // Server already exited.
  }
};

async function waitForReady() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const res = await fetch(base, { signal: AbortSignal.timeout(1000) });
      if (res.ok) return;
    } catch {
      // Server not accepting connections yet.
    }
    await sleep(500);
  }
  throw new Error(`Server did not become ready at ${base}`);
}

async function run() {
  await waitForReady();

  const failures = [];
  for (const { path, title } of routes) {
    try {
      const res = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(5000) });
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
}

try {
  await run();
} finally {
  stopServer();
}
