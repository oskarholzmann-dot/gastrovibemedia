import { Check, X } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/config/site";
import type { Media } from "@/config/site";

export function ProblemSolution() {
  const { problem } = site;

  return (
    <section id="warum" aria-labelledby="warum-title" className="scroll-mt-16 bg-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={problem.eyebrow} title={problem.title} intro={problem.intro} />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[problem.before, problem.after].map((side, index) => {
            const isAfter = index === 1;
            const image: Media = side.image;

            return (
              <Reveal key={side.label} delay={index * 0.1}>
                <article
                  className={`h-full overflow-hidden rounded-3xl border ${isAfter ? "border-amber-gold/40 bg-gradient-to-b from-accent to-slate-warm" : "border-border bg-slate-warm"}`}
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ filter: image.filter }}
                    />
                    <span
                      className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${isAfter ? "bg-amber-gold text-charcoal" : "bg-black/60 text-cream-muted backdrop-blur"}`}
                    >
                      {side.label}
                    </span>
                  </div>
                  <ul className="space-y-3 p-6 sm:p-8">
                    {side.points.map((point) => (
                      <li key={point} className={`flex gap-3 ${isAfter ? "text-cream" : "text-cream-muted/60"}`}>
                        {isAfter ? (
                          <Check className="mt-0.5 size-5 shrink-0 text-amber-gold" aria-hidden="true" />
                        ) : (
                          <X className="mt-0.5 size-5 shrink-0 text-cream-muted/35" aria-hidden="true" />
                        )}
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
