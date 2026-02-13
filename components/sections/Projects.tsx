import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="bg-slate-900/50 py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid gap-6">
          {projects.map((entry, i) => (
            <ProjectCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
