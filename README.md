# Portfolio

Personal portfolio site for Brendan C. Smith — [brendansmith.ai](https://brendansmith.ai)

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Statically exported and deployed on Vercel.

## Development

Two commands cover almost everything:

```bash
npm run dev        # everyday iteration — live-reloading site at localhost:3000
npm run preview    # see exactly what Vercel ships — build + PDFs, served at localhost:3000
```

Use **`npm run dev`** while working: it live-reloads every page, including the
resume pages at `/resume`, `/resume-extended`, and `/resume-ats`. It does **not**
serve the downloadable PDF or use clean URLs — those exist only in a build.

When you want to check the real thing — clean URLs, the generated PDFs, and the
Hero's `/resume.pdf` download link — run **`npm run preview`**. It builds the
static export, generates the PDFs, and serves `out/` at localhost:3000 exactly as
Vercel does.

Other commands: `npm run build` (static export), `npm run lint`,
`npm run typecheck`, `npm run format`.

## Resume PDF Generation

The site includes print-optimized resume pages (`/resume`, `/resume-extended`, and `/resume-ats`) that can be exported to PDF:

```bash
npm run build:resume
```

This builds the site, serves it through `scripts/static-server.mjs`, and uses
headless Chrome to render those routes into three US Letter PDFs:
`out/resume.pdf` (one-page styled), `out/resume-extended.pdf` (multi-page
long-form), and `out/resume-ats.pdf` (single-column plain variant optimized for
ATS parsers — two-column designs can scramble parser reading order). Each
route's `@page` CSS rule controls its page size. The PDFs are build artifacts (not committed); Vercel
regenerates them on every deploy via the `buildCommand` in `vercel.json` and
deploys the raw `out/` directory (`framework: null`, `outputDirectory`,
`cleanUrls`), so post-build artifacts like the PDFs actually ship. To preview
them locally, run `npm run preview`.

## Architecture

- **Static export** — `output: "export"` in next.config.ts, no server-side rendering
- **Data-driven content** — All portfolio content lives in typed TypeScript files under `data/` (personal, experience, education, projects, skills). Components read from these rather than hardcoding copy in JSX.
- **Resume system** — Three variants: standard and extended share `components/resume/ResumeLayout.tsx`, plus a single-column ATS-friendly variant at `/resume-ats`. Uses raw CSS (not Tailwind) for precise print control on US Letter (8.5" x 11") pages — the standard variant fits one page, the extended variant paginates.
- **Dark mode** — Default theme, toggled via `.dark` class on `<html>` and persisted to localStorage
- **Scroll navigation** — Navbar uses IntersectionObserver to highlight the active section
