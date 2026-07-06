"use client";

import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "hero", label: "Home" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-sm font-bold text-slate-900 dark:text-slate-100">
          BCS
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {sections.map((s) => (
            <NavLink key={s.id} href={`#${s.id}`} label={s.label} active={active === s.id} />
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-slate-500 dark:text-slate-400"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col gap-4">
            {sections.map((s) => (
              <NavLink
                key={s.id}
                href={`#${s.id}`}
                label={s.label}
                active={active === s.id}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
