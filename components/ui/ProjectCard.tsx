import type { ProjectEntry } from "@/data/projects";
import FadeInOnScroll from "./FadeInOnScroll";

export default function ProjectCard({ entry }: { entry: ProjectEntry }) {
  return (
    <FadeInOnScroll className="rounded-xl border border-slate-700 p-6">
      <h3 className="text-lg font-bold text-slate-100">
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-400"
          >
            {entry.title}
          </a>
        ) : (
          entry.title
        )}
      </h3>
      <ul className="mt-3 space-y-2">
        {entry.bullets.map((b, i) => (
          <li key={i} className="relative pl-4 text-sm text-slate-400 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-slate-600">
            {b}
          </li>
        ))}
      </ul>
    </FadeInOnScroll>
  );
}
