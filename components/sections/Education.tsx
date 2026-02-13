import { education } from "@/data/education";
import SectionHeading from "@/components/ui/SectionHeading";
import DegreeCard from "@/components/ui/DegreeCard";

export default function Education() {
  return (
    <section id="education" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Education</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((entry, i) => (
            <DegreeCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
