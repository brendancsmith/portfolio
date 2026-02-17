"use client";

import Image from "next/image";
import { personal } from "@/data/personal";
import ExternalLink from "@/components/ui/ExternalLink";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-8 sm:pt-0 text-center"
    >
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <FadeInOnScroll>
        <Image
          src="/headshot.webp"
          alt="Brendan C. Smith"
          width={160}
          height={160}
          priority
          className="mx-auto mb-8 rounded-full ring-2 ring-blue-500/20 ring-offset-4 ring-offset-slate-950"
        />
      </FadeInOnScroll>

      <FadeInOnScroll delay={100}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-6xl">
          {personal.name}
        </h1>
      </FadeInOnScroll>

      <FadeInOnScroll delay={200}>
        <p className="mt-4 text-xl sm:text-3xl font-medium bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {personal.title}
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={300}>
        <p className="mt-8 sm:mt-24 max-w-2xl text-lg leading-relaxed text-slate-400">
          {personal.intro}
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll
        delay={400}
        className="mt-8 flex flex-wrap items-center justify-center gap-6"
      >
        <ExternalLink
          href={`mailto:${personal.email}`}
          label={personal.email}
          icon="email"
        />
        <ExternalLink
          href={`tel:${personal.phone}`}
          label={personal.phone}
          icon="phone"
        />
        <ExternalLink
          href={personal.linkedin}
          label="LinkedIn"
          icon="linkedin"
        />
        <ExternalLink
          href={personal.github}
          label="GitHub"
          icon="github"
        />
        <ExternalLink
          href="/resume.pdf"
          label="Resume"
          icon="resume"
        />
      </FadeInOnScroll>
    </section>
  );
}
