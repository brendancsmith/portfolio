# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Brendan C. Smith — a static Next.js site deployed on Vercel at [brendansmith.ai](https://brendansmith.ai). Includes a home page with scrollable sections and print-optimized resume pages that generate to PDF.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Static export to `out/`
- `npm run lint` — ESLint (linting)
- `npm run typecheck` — TypeScript type-check (`tsc --noEmit`)
- `npm run format` — Biome (write formatting changes in place)
- `npm run format:check` — Biome (verify formatting; used by CI, non-zero exit on drift)
- `npm run build:resume` — Build site, spin up temp server on :3999, use Chrome headless to generate `public/resume.pdf` and `public/resume-extended.pdf`
- `npm run test:smoke` — Serve `out/` with `serve` and assert each route returns HTTP 200 with its expected `<title>` (run `npm run build` first)

## Architecture

**Static export**: `output: "export"` in next.config.ts — no server-side rendering, no API routes. Deployed to Vercel as static files.

**Content is data-driven**: All portfolio content lives in typed TypeScript files under `data/` (personal.ts, experience.ts, education.ts, projects.ts, skills.ts). Components read from these — no hardcoded copy in JSX.

**Resume system**: Two resume variants (standard and extended) share a single `components/resume/ResumeLayout.tsx` component. The standard variant uses `resumeBullets` (condensed) while extended uses full `bullets`. Resume styling uses raw inline CSS strings (not Tailwind) for precise print control at 8.5" x 15" page size.

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
- **Build & smoke test** — `npm run build` (static export), then `npm run test:smoke`, which serves `out/` and asserts `/`, `/resume`, and `/resume-extended` each return 200 with the expected `<title>`.

Actions are pinned to major tags (`actions/checkout@v7`, `actions/setup-node@v6`); `.github/dependabot.yml` keeps them current via grouped weekly updates of the `github-actions` ecosystem.

## Key Patterns

- Path alias: `@/*` maps to project root (e.g., `@/data/experience`)
- Theme: default is dark mode; toggle in ThemeToggle.tsx writes to localStorage and toggles `.dark` class
- Resume PDFs must be regenerated with `npm run build:resume` after any data or layout changes
