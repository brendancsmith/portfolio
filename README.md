# Portfolio

Personal portfolio site for Brendan C. Smith — [brendansmith.ai](https://brendansmith.ai)

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Statically exported and deployed on Vercel.

## Development

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Static export to out/
npm run lint       # ESLint
```

## Resume PDF Generation

The site includes print-optimized resume pages (`/resume` and `/resume-extended`) that can be exported to PDF:

```bash
npm run build:resume
```

This builds the site, starts a temporary server, and uses Chrome headless to generate `public/resume.pdf` and `public/resume-extended.pdf`.

## Architecture

- **Static export** — `output: "export"` in next.config.ts, no server-side rendering
- **Data-driven content** — All portfolio content lives in typed TypeScript files under `data/` (personal, experience, education, projects, skills). Components read from these rather than hardcoding copy in JSX.
- **Resume system** — Two variants (standard and extended) share `components/resume/ResumeLayout.tsx`. Uses raw CSS (not Tailwind) for precise print control at 8.5" x 15" page size.
- **Dark mode** — Default theme, toggled via `.dark` class on `<html>` and persisted to localStorage
- **Scroll navigation** — Navbar uses IntersectionObserver to highlight the active section
