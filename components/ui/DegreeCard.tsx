import type { EducationEntry } from "@/data/education";
import FadeInOnScroll from "./FadeInOnScroll";

export default function DegreeCard({ entry }: { entry: EducationEntry }) {
  return (
    <FadeInOnScroll className="rounded-xl border border-slate-700 p-6">
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
