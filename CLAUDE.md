# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Brendan C. Smith — a static Next.js site deployed on Vercel at [brendansmith.ai](https://brendansmith.ai). Includes a home page with scrollable sections and print-optimized resume pages that generate to PDF.

## Commands

Two workflows cover almost everything:

- **`npm run dev`** — everyday iteration. Live-reloading site at localhost:3000, including the `/resume`, `/resume-extended`, and `/resume-ats` **pages** — edit content/layout and see it instantly. Does **not** serve the downloadable PDF or use clean URLs; those exist only in a build.
- **`npm run preview`** — see exactly what Vercel ships. Builds the site and PDFs, then serves `out/` at localhost:3000 with clean URLs and the working `/resume.pdf` download link. Use before shipping, or whenever you touch the resume PDF/download.

Supporting commands:

- `npm run build` — static export to `out/` (no PDFs)
- `npm run build:resume` — `next build`, then render `/resume`, `/resume-extended`, and `/resume-ats` to `out/resume.pdf`, `out/resume-extended.pdf`, and `out/resume-ats.pdf` with headless Chromium (what `preview` builds, and what Vercel runs on deploy)
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript type-check (`tsc --noEmit`)
- `npm run format` / `npm run format:check` — Biome (write in place / verify; CI uses the check)
- `npm run test:smoke` — serve `out/` and assert the HTML routes (including `/resume-ats`) return 200 with their expected `<title>`, all three resume PDFs serve as `application/pdf`, `/resume.html` redirects to `/resume`, and unknown routes 404 (run `npm run build:resume` first)

## Architecture

**Static export**: `output: "export"` in next.config.ts — no server-side rendering, no API routes. Deployed to Vercel as static files.

**Content is data-driven**: All portfolio content lives in typed TypeScript files under `data/` (personal.ts, experience.ts, education.ts, projects.ts, skills.ts). Components read from these — no hardcoded copy in JSX.

**Resume system**: Three resume variants. Standard and extended share a single `components/resume/ResumeLayout.tsx` component — the standard variant uses `resumeBullets` (condensed) and fits one page, while extended uses full `bullets` and paginates over multiple pages. A third single-column variant at `/resume-ats` is optimized for ATS parsers (two-column designs can scramble parser reading order). Resume styling uses raw inline CSS strings (not Tailwind) for precise print control on US Letter (8.5" x 11") pages; each route's `@page` CSS rule sets the PDF page size (the generator passes Puppeteer `preferCSSPageSize: true`). The downloadable PDFs are build artifacts (not committed): `scripts/generate-resume-pdfs.mjs` serves the static export and prints those routes to `out/resume.pdf` / `out/resume-extended.pdf` / `out/resume-ats.pdf`, using the system Chrome locally and `@sparticuz/chromium` in the Vercel build container. Vercel regenerates them on every deploy via the `buildCommand` in `vercel.json`, which also sets `framework: null` + `outputDirectory: "out"` + `cleanUrls: true` so Vercel serves the raw `out/` directory — required, because the Next.js builder packages its deploy output during `next build` and would silently drop files (like these PDFs) generated into `out/` afterwards. The generator, the smoke test, and `npm run preview` all serve `out/` through one shared `scripts/static-server.mjs` helper (an in-process wrapper over `serve-handler`).

**Styling**: Tailwind CSS 4 via PostCSS for all components except the resume. Dark mode via `.dark` class on `<html>`, persisted to localStorage.

**Scroll navigation**: Navbar uses IntersectionObserver to highlight the active section as the user scrolls. `FadeInOnScroll` component provides entrance animations.

## Linting & formatting

Two tools with a strict division of labor — they do not overlap:

- **ESLint** (`eslint-config-next`) owns **linting**. It contributes the Next.js-aware `core-web-vitals` and TypeScript rule sets (e.g. flagging raw `<img>`, sync scripts) that Biome does not provide.
- **Biome** owns **formatting** only. Its config (`biome.json`) sets `linter.enabled: false` and `assist.enabled: false`, so Biome never lints or sorts imports — it just formats. Style: 2-space indent, double quotes, semicolons, 100-char width. `css.parser.tailwindDirectives` is enabled so Tailwind v4 at-rules in `globals.css` parse.

The husky `pre-commit` hook runs `lint-staged`, which applies `eslint --fix` then `biome format --write` to staged files.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and PRs, as two parallel jobs:

- **Lint, types & format** — `npm run lint`, `npm run typecheck`, `npm run format:check`. The type and format steps use `if: ${{ !cancelled() }}` so every check reports even after an earlier one fails.
- **Build & smoke test** — `npm run build:resume` (static export + PDF generation, using the runner's Chrome), then `npm run test:smoke`, which serves `out/` and asserts the HTML routes, the generated PDFs, the `/resume.html` → `/resume` redirect, and 404 handling.

Actions are pinned to major tags (`actions/checkout@v7`, `actions/setup-node@v6`); `.github/dependabot.yml` keeps them current via grouped weekly updates of the `github-actions` ecosystem.

## Key Patterns

- Path alias: `@/*` maps to project root (e.g., `@/data/experience`)
- Theme: default is dark mode; toggle in ThemeToggle.tsx writes to localStorage and toggles `.dark` class
- The resume download (`/resume.pdf`, linked from the Hero) is a build artifact in `out/`, regenerated automatically on every Vercel deploy. `npm run dev` renders the `/resume`, `/resume-extended`, and `/resume-ats` **pages** live from source (iterate on layout/content there with HMR), but does **not** serve the generated `/resume.pdf` — that binary only exists in `out/`. To verify the deployed artifacts (clean URLs, the PDFs, the Hero download link), run `npm run preview`.
