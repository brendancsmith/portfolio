#!/usr/bin/env node
// Generate the resume PDFs from the exported static site.
//
// Serves the static export, renders the print-styled /resume, /resume-extended,
// and /resume-ats routes with headless Chromium, and writes resume.pdf,
// resume-extended.pdf, and resume-ats.pdf into the target directory
// (default: out/). Each route's own @page CSS rule controls the PDF page size
// (preferCSSPageSize), and multi-page output is allowed.
//
// One code path, two environments:
//   • Vercel build (Linux, no system Chrome) → bundled @sparticuz/chromium
//   • Local dev machine                       → the system Chrome/Chromium
//
// Usage: node scripts/generate-resume-pdfs.mjs [--out-dir out]

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import puppeteer from "puppeteer-core";
import { startStaticServer } from "./static-server.mjs";

// Navigate to the exported .html files directly (cleanUrls is off) — a bare
// /resume is ambiguous because the export also emits an out/resume/ directory
// of RSC payloads.
const PAGES = [
  { route: "/resume.html", file: "resume.pdf" },
  { route: "/resume-extended.html", file: "resume-extended.pdf" },
  { route: "/resume-ats.html", file: "resume-ats.pdf" },
];

const DEFAULT_LOCAL_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function parseOutDir() {
  const i = process.argv.indexOf("--out-dir");
  const dir = i !== -1 ? process.argv[i + 1] : undefined;
  return resolve(process.cwd(), dir || "out");
}

async function resolveLaunchOptions() {
  if (process.env.VERCEL) {
    const { default: chromium } = await import("@sparticuz/chromium");
    chromium.setGraphicsMode = false;
    return {
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  }

  const executablePath = process.env.CHROME_PATH || DEFAULT_LOCAL_CHROME;
  if (!existsSync(executablePath)) {
    throw new Error(
      `Chrome not found at ${executablePath}. Set CHROME_PATH to your Chrome/Chromium binary.`,
    );
  }
  // CHROME_ARGS passes extra launch flags where the environment needs them
  // (e.g. CHROME_ARGS=--no-sandbox in rootful containers and CI).
  const args = (process.env.CHROME_ARGS ?? "").split(/\s+/).filter(Boolean);
  return { args, executablePath, headless: true };
}

async function main() {
  const outDir = parseOutDir();
  if (!existsSync(resolve(outDir, "resume.html"))) {
    throw new Error(`${outDir} has no exported resume.html. Run \`next build\` first.`);
  }

  // cleanUrls off so the .html routes above resolve directly.
  const { origin, close } = await startStaticServer(outDir, { cleanUrls: false });

  const browser = await puppeteer.launch(await resolveLaunchOptions());
  try {
    for (const { route, file } of PAGES) {
      const page = await browser.newPage();
      const response = await page.goto(`${origin}${route}`, {
        waitUntil: "networkidle0",
      });
      if (!response || !response.ok()) {
        throw new Error(`${route} returned ${response?.status()}`);
      }
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({
        path: resolve(outDir, file),
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();
      console.log(`Generated ${resolve(outDir, file)}`);
    }
  } finally {
    await browser.close();
    await close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
