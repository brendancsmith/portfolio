#!/usr/bin/env node
// Smoke-test the static export: serve out/ the way Vercel does and assert the
// HTML routes, the generated resume PDFs, and the clean-URL behavior all hold.
// Run `npm run build:resume` first (the PDFs are build artifacts).

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
  { path: "/resume-ats", title: "Brendan C. Smith | Resume (ATS)" },
];

// The downloadable PDFs are generated at build time — assert they shipped and
// contain PDF data, so CI catches broken generation instead of relying on
// manual verification.
const pdfs = ["/resume.pdf", "/resume-extended.pdf", "/resume-ats.pdf"];

for (const [file, buildCommand] of [
  ["index.html", "npm run build"],
  ["resume.pdf", "npm run build:resume"],
]) {
  if (!existsSync(join(outDir, file))) {
    console.error(`out/${file} not found — run \`${buildCommand}\` before the smoke test.`);
    process.exit(1);
  }
}

// Clean URLs + real 404s (no index fallback), so a genuinely broken route fails
// instead of silently serving index.html.
const { origin, close } = await startStaticServer(outDir, { cleanUrls: true });

const failures = [];
let passes = 0;

// Fetch `path` and record `assert`'s verdict: a failure message, or null on pass.
async function check(path, assert, fetchOpts = {}) {
  let verdict;
  try {
    const res = await fetch(`${origin}${path}`, {
      signal: AbortSignal.timeout(5000),
      ...fetchOpts,
    });
    verdict = await assert(res);
  } catch (err) {
    verdict = `request failed: ${err.message}`;
  }
  if (verdict) {
    failures.push(`${path} → ${verdict}`);
  } else {
    passes += 1;
  }
}

try {
  for (const { path, title } of routes) {
    await check(path, async (res) => {
      if (res.status !== 200) return `HTTP ${res.status} (expected 200)`;
      const body = await res.text();
      if (!body.includes(`<title>${title}</title>`)) {
        return `200 but missing <title>${title}</title>`;
      }
      console.log(`✓ ${path} → 200, title "${title}"`);
      return null;
    });
  }

  for (const path of pdfs) {
    await check(path, async (res) => {
      if (res.status !== 200) return `HTTP ${res.status} (expected 200)`;
      const type = res.headers.get("content-type") ?? "";
      if (!type.includes("application/pdf")) {
        return `200 but content-type "${type}" (expected application/pdf)`;
      }
      const bytes = new Uint8Array(await res.arrayBuffer());
      if (String.fromCharCode(...bytes.slice(0, 5)) !== "%PDF-") {
        return "200 but body does not start with %PDF-";
      }
      console.log(`✓ ${path} → 200, application/pdf (${bytes.length} bytes)`);
      return null;
    });
  }

  // serve-handler's cleanUrls must redirect /resume.html → /resume, matching Vercel.
  await check(
    "/resume.html",
    (res) => {
      if (res.status !== 301 && res.status !== 302) {
        return `HTTP ${res.status} (expected 301/302 redirect)`;
      }
      const location = res.headers.get("location");
      const target = location ? new URL(location, origin).pathname : "(none)";
      if (target !== "/resume") return `redirects to ${target} (expected /resume)`;
      console.log(`✓ /resume.html → ${res.status} → /resume`);
      return null;
    },
    { redirect: "manual" },
  );

  // A bogus route must 404 instead of falling back to index.html.
  await check("/non-existent-route", (res) => {
    if (res.status !== 404) return `HTTP ${res.status} (expected 404)`;
    console.log("✓ /non-existent-route → 404");
    return null;
  });

  if (failures.length > 0) {
    console.error(`\nSmoke test failed:\n  ${failures.join("\n  ")}`);
    process.exitCode = 1;
  } else {
    console.log(`\nSmoke test passed: ${passes} checks OK.`);
  }
} finally {
  await close();
}
