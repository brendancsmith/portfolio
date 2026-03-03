# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Brendan C. Smith — a static Next.js site deployed on Vercel at [brendansmith.ai](https://brendansmith.ai). Includes a home page with scrollable sections and print-optimized resume pages that generate to PDF.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Static export to `out/`
- `npm run lint` — ESLint
- `npm run build:resume` — Build site, spin up temp server on :3999, use Chrome headless to generate `public/resume.pdf` and `public/resume-extended.pdf`

## Architecture

**Static export**: `output: "export"` in next.config.ts — no server-side rendering, no API routes. Deployed to Vercel as static files.

**Content is data-driven**: All portfolio content lives in typed TypeScript files under `data/` (personal.ts, experience.ts, education.ts, projects.ts, skills.ts). Components read from these — no hardcoded copy in JSX.

**Resume system**: Two resume variants (standard and extended) share a single `components/resume/ResumeLayout.tsx` component. The standard variant uses `resumeBullets` (condensed) while extended uses full `bullets`. Resume styling uses raw inline CSS strings (not Tailwind) for precise print control at 8.5" x 15" page size.

**Styling**: Tailwind CSS 4 via PostCSS for all components except the resume. Dark mode via `.dark` class on `<html>`, persisted to localStorage.

**Scroll navigation**: Navbar uses IntersectionObserver to highlight the active section as the user scrolls. `FadeInOnScroll` component provides entrance animations.

## Key Patterns

- Path alias: `@/*` maps to project root (e.g., `@/data/experience`)
- Theme: default is dark mode; toggle in ThemeToggle.tsx writes to localStorage and toggles `.dark` class
- Resume PDFs must be regenerated with `npm run build:resume` after any data or layout changes
