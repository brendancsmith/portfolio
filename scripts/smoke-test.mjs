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
// manual verification. Each entry also pins the layout contract this project
// guarantees: US Letter sizing plus the page count the variant is designed for
// (standard fits one page; extended and ATS paginate to two).
const pdfs = [
  { path: "/resume.pdf", pages: 1 },
  { path: "/resume-extended.pdf", pages: 2 },
  { path: "/resume-ats.pdf", pages: 2 },
];

// US Letter media box in PDF points (8.5" × 11" at 72 dpi). preferCSSPageSize
// maps each route's @page size onto this box.
const LETTER_MEDIA_BOX = /\/MediaBox\s*\[\s*0\s+0\s+612\s+792\s*\]/;

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

  for (const { path, pages } of pdfs) {
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
      const pdf = Buffer.from(bytes).toString("latin1");
      if (!LETTER_MEDIA_BOX.test(pdf)) {
        return "200 but media box is not US Letter (expected [0 0 612 792])";
      }
      const pageCount = (pdf.match(/\/Type\s*\/Page\b/g) ?? []).length;
      if (pageCount !== pages) {
        return `200 but has ${pageCount} page(s) (expected ${pages})`;
      }
      console.log(
        `✓ ${path} → 200, application/pdf, US Letter, ${pageCount} page(s) (${bytes.length} bytes)`,
      );
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
