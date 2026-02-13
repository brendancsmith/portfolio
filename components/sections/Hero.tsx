"use client";

import Image from "next/image";
import { personal } from "@/data/personal";
import ExternalLink from "@/components/ui/ExternalLink";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <FadeInOnScroll>
        <Image
          src="/headshot.jpg"
          alt="Brendan C. Smith"
          width={160}
          height={160}
          priority
          className="mx-auto mb-8 rounded-full"
        />
      </FadeInOnScroll>

      <FadeInOnScroll delay={100}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-6xl">
          {personal.name}
        </h1>
      </FadeInOnScroll>

      <FadeInOnScroll delay={200}>
        <p className="mt-4 text-xl sm:text-3xl text-blue-600 font-medium">
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
          href="/resume.pdf"
          label="Resume"
          icon="resume"
        />
      </FadeInOnScroll>
    </section>
  );
}
