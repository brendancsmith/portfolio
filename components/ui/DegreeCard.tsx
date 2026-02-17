import type { EducationEntry } from "@/data/education";
import FadeInOnScroll from "./FadeInOnScroll";

export default function DegreeCard({ entry }: { entry: EducationEntry }) {
  return (
    <FadeInOnScroll className="rounded-xl border border-slate-700/50 bg-slate-900/30 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5">
      <p className="font-mono text-sm text-slate-500">{entry.dates}</p>
      <h3 className="mt-1 text-lg font-bold text-slate-100">{entry.degree}</h3>
      <p className="text-slate-400">{entry.institution}</p>
      <p className="mt-1 text-sm text-slate-500">GPA: {entry.gpa}</p>
      {entry.highlights.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entry.highlights.map((h, i) => (
            <li key={i} className="relative pl-4 text-sm text-slate-400 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-slate-600">
              {h}
            </li>
          ))}
        </ul>
      )}
    </FadeInOnScroll>
  );
}
