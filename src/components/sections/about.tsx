import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "cn";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { getSite, sectionPath } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export function About({ lang }: { lang: Locale }) {
  const { about } = getSite(lang);

  return (
    <>
      <section aria-labelledby="about-title" className="bg-charcoal pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-gold uppercase">{about.eyebrow}</p>
            <h1 id="about-title" className="mt-4 text-4xl leading-tight font-semibold text-cream sm:text-5xl lg:text-6xl">
              {about.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-cream-muted/75">{about.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-border">
              <Image src={about.photo.src} alt={about.photo.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="story-title" className="bg-slate-warm py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 id="story-title" className="text-3xl font-semibold text-cream sm:text-4xl">
              {about.storyTitle}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-cream-muted/80">
              {about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="founders-title" className="bg-charcoal py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="founders-title" className="text-3xl font-semibold text-cream sm:text-4xl">
            {about.foundersTitle}
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {about.founders.map((founder, index) => (
              <Reveal key={founder.name} delay={index * 0.1}>
                <article className="h-full rounded-3xl border border-border bg-slate-warm p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold text-cream sm:text-3xl">{founder.name}</h3>
                  <p className="mt-2 text-sm font-semibold tracking-wide text-amber-gold">{founder.role}</p>
                  <p className="mt-5 leading-relaxed text-cream-muted/80">{founder.text}</p>
                  <h4 className="mt-6 font-sans text-xs font-semibold tracking-[0.2em] text-cream-muted/50 uppercase">{about.focusLabel}</h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {founder.focus.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-cream">
                        <Check className="mt-0.5 size-4 shrink-0 text-amber-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-slate-warm py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="values-title" className="text-3xl font-semibold text-cream sm:text-4xl">
            {about.valuesTitle}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {about.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-charcoal p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-cream">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream-muted/75">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-cream-muted/60">{about.family}</p>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" className="bg-charcoal py-16 sm:py-24">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="about-cta-title" className="text-3xl font-semibold text-cream sm:text-4xl">
            {about.cta.title}
          </h2>
          <p className="mt-4 text-lg text-cream-muted/75">{about.cta.text}</p>
          <a href={sectionPath(lang, "anfrage")} className={cn(buttonVariants(), "group mt-8 h-13 rounded-full px-7 text-base font-semibold")}>
            {about.cta.button}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>
      </section>
    </>
  );
}
