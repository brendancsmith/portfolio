import type { ExperienceEntry } from "@/data/experience";
import FadeInOnScroll from "./FadeInOnScroll";

export default function TimelineItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <FadeInOnScroll className="relative pl-8 pb-12 last:pb-0">
      {/* timeline line */}
      <div className="absolute left-[7px] top-2 -bottom-2 w-px bg-slate-200 last:hidden" />
      {/* dot */}
      <div className="absolute left-0 top-[6px] h-[15px] w-[15px] rounded-full border-[3px] border-blue-600 bg-white" />

      <p className="font-mono text-sm text-slate-400">{entry.dates}</p>
      <h3 className="mt-1 text-lg font-bold text-slate-900">{entry.role}</h3>
      <p className="text-slate-600">
        {entry.company} &middot; {entry.location}
      </p>
      <ul className="mt-3 space-y-2">
        {entry.bullets.map((b, i) => (
          <li key={i} className="relative pl-4 text-slate-600 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-slate-300">
            {b}
          </li>
        ))}
      </ul>
    </FadeInOnScroll>
  );
}
