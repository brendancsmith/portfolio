"use client";

import { personal } from "@/data/personal";
import ExternalLink from "@/components/ui/ExternalLink";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center px-6 py-32 text-center"
    >
      <FadeInOnScroll>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          {personal.name}
        </h1>
      </FadeInOnScroll>

      <FadeInOnScroll delay={100}>
        <p className="mt-4 text-xl text-blue-600 font-medium">{personal.title}</p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={200}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {personal.intro}
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={300} className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <ExternalLink href={`mailto:${personal.email}`} label={personal.email} icon="email" />
        <ExternalLink href={`tel:${personal.phone}`} label={personal.phone} icon="phone" />
        <ExternalLink href={personal.linkedin} label="LinkedIn" icon="linkedin" />
      </FadeInOnScroll>
    </section>
  );
}
