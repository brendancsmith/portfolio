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
resume pages at `/resume` and `/resume-extended`. It does **not** serve the
downloadable PDF or use clean URLs — those exist only in a build.

When you want to check the real thing — clean URLs, the generated PDFs, and the
Hero's `/resume.pdf` download link — run **`npm run preview`**. It builds the
static export, generates the PDFs, and serves `out/` at localhost:3000 exactly as
Vercel does.

Other commands: `npm run build` (static export), `npm run lint`,
`npm run typecheck`, `npm run format`.

## Resume PDF Generation

The site includes print-optimized resume pages (`/resume` and `/resume-extended`) that can be exported to PDF:

```bash
npm run build:resume
```

This builds the site, serves it through `scripts/static-server.mjs`, and uses
headless Chrome to render those routes into `out/resume.pdf` and
`out/resume-extended.pdf`. The PDFs are build artifacts (not committed); Vercel
regenerates them on every deploy via the `buildCommand` in `vercel.json`. To
preview them locally, run `npm run preview`.

## Architecture

- **Static export** — `output: "export"` in next.config.ts, no server-side rendering
- **Data-driven content** — All portfolio content lives in typed TypeScript files under `data/` (personal, experience, education, projects, skills). Components read from these rather than hardcoding copy in JSX.
- **Resume system** — Two variants (standard and extended) share `components/resume/ResumeLayout.tsx`. Uses raw CSS (not Tailwind) for precise print control at 8.5" x 15" page size.
- **Dark mode** — Default theme, toggled via `.dark` class on `<html>` and persisted to localStorage
- **Scroll navigation** — Navbar uses IntersectionObserver to highlight the active section
