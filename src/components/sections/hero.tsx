"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { getSite } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export function Hero({ lang }: { lang: Locale }) {
  const reduceMotion = useReducedMotion();
  const { hero } = getSite(lang);
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {hero.video ? (
          <video
            className="size-full object-cover"
            src={hero.video}
            poster={hero.image.src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="100vw" className="animate-ken-burns object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pb-24">
        <motion.p {...rise(0.05)} className="text-xs font-semibold tracking-[0.25em] text-amber-gold uppercase">
          {hero.eyebrow}
        </motion.p>
        <motion.h1 {...rise(0.15)} id="hero-title" className="mt-5 text-[2.75rem] leading-[1.05] font-semibold text-cream sm:text-6xl lg:text-7xl">
          {hero.headline.map((line, index) => (
            <span key={line} className={cn("block", index === 1 && "text-amber-gold italic")}>
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.p {...rise(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-cream-muted/85">
          {hero.subheadline}
        </motion.p>
        <motion.div {...rise(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#anfrage" className={cn(buttonVariants(), "group h-13 rounded-full px-7 text-base font-semibold")}>
            {hero.primaryCta}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href="#portfolio"
            className={cn(buttonVariants({ variant: "ghost" }), "h-13 rounded-full border border-cream/25 px-7 text-base font-semibold text-cream hover:bg-white/10")}
          >
            <Play className="size-4" aria-hidden="true" />
            {hero.secondaryCta}
          </a>
        </motion.div>
        <motion.dl {...rise(0.6)} className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/15 pt-6">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading text-2xl font-semibold text-cream sm:text-3xl">{stat.value}</span>
                <span className="mt-1 block text-xs text-cream-muted/70 sm:text-sm">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
