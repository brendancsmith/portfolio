import type { ProjectEntry } from "@/data/projects";
import FadeInOnScroll from "./FadeInOnScroll";

export default function ProjectCard({ entry }: { entry: ProjectEntry }) {
  return (
    <FadeInOnScroll className="rounded-xl border border-slate-200 bg-white dark:border-slate-700/50 dark:bg-slate-900/30 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {entry.title}
          </a>
        ) : (
          entry.title
        )}
      </h3>
      {entry.description && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {entry.description}
        </p>
      )}
      <ul className="mt-3 space-y-2">
        {entry.bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-slate-300 dark:before:bg-slate-600"
          >
            {b}
          </li>
        ))}
      </ul>
    </FadeInOnScroll>
  );
}
