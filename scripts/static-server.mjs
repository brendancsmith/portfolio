#!/usr/bin/env node
// Serve a directory of static files the way Vercel serves the deployed export:
// clean URLs (/resume serves resume.html; /resume.html redirects to /resume) and
// real 404s for missing routes. One serving code path, used three ways:
//   • import { startStaticServer } — the PDF generator and the smoke test each
//     spin up an ephemeral in-process server to render/inspect the build.
//   • node scripts/static-server.mjs [dir] [port] — `npm run preview` serves the
//     build at a stable URL so you can click through exactly what Vercel ships.
//
// `serve` is a thin CLI over this same serve-handler library, so using it
// directly keeps generate, smoke-test, and preview on identical behavior.

import { once } from "node:events";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import serveHandler from "serve-handler";

/**
 * Start an in-process static file server for `dir`.
 * @param {string} dir - directory to serve
 * @param {{ port?: number, cleanUrls?: boolean }} [opts] - port 0 (default)
 *   picks an ephemeral port; cleanUrls defaults to true (production-like).
 * @returns {Promise<{ origin: string, close: () => Promise<void> }>}
 */
export async function startStaticServer(dir, { port = 0, cleanUrls = true } = {}) {
  const server = createServer((req, res) => serveHandler(req, res, { public: dir, cleanUrls }));
  server.listen(port, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${server.address().port}`;
  const close = () => new Promise((closed) => server.close(closed));
  return { origin, close };
}

// Run directly (`npm run preview`) to serve the build at a stable URL.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = resolve(process.cwd(), process.argv[2] || "out");
  const port = Number(process.argv[3] || 3000);
  const { origin } = await startStaticServer(dir, { port });
  console.log(`Serving ${dir}`);
  console.log(`  ${origin}  (Ctrl+C to stop)`);
}
