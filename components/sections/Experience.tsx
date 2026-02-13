import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Experience</SectionHeading>
        <div>
          {experience.map((entry, i) => (
            <TimelineItem key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
