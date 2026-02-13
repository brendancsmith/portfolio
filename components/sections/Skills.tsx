import { skills } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillPill from "@/components/ui/SkillPill";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export default function Skills() {
  return (
    <section id="skills" className="bg-slate-900/50 py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Skills</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((group) => (
            <FadeInOnScroll key={group.category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillPill key={skill} label={skill} />
                ))}
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
