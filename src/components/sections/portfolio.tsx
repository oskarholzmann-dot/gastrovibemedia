"use client";

import { Heart, MessageCircle, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "cn";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getSite } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import type { Reel } from "@/config/site";

/** Ein Reel im Smartphone-Rahmen (9:16). Mit Video spielt es auf Klick ab. */
function ReelPhone({ reel, lang }: { reel: Reel; lang: Locale }) {
  const { ui } = getSite(lang);
  const video = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const element = video.current;

    if (!element) {
      return;
    }

    if (element.paused) {
      void element.play();
      setIsPlaying(true);
    } else {
      element.pause();
      setIsPlaying(false);
    }
  };

  return (
    <figure className="group relative mx-auto w-full max-w-[260px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2.2rem] border-[6px] border-zinc-800 bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="absolute top-2 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        {reel.video ? (
          <video ref={video} src={reel.video} poster={reel.poster.src} muted loop playsInline className="size-full object-cover" />
        ) : (
          <Image
            src={reel.poster.src}
            alt={reel.poster.alt}
            fill
            sizes="260px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-cream" aria-hidden="true">
          <Heart className="size-6 fill-cream/90" />
          <MessageCircle className="size-6" />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 p-4 text-cream">
          <span className="rounded-full bg-amber-gold/90 px-2.5 py-0.5 text-[11px] font-semibold text-charcoal">{reel.category}</span>
          <p className="mt-2 font-heading text-lg font-semibold">{reel.title}</p>
        </figcaption>

        {reel.video ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 z-10 flex items-center justify-center"
            aria-label={`${reel.title} ${isPlaying ? ui.pause : ui.play}`}
          >
            <span className={`flex size-14 items-center justify-center rounded-full bg-cream/90 text-charcoal transition-opacity ${isPlaying ? "opacity-0 group-hover:opacity-100" : ""}`}>
              {isPlaying ? <Pause className="size-6" /> : <Play className="ml-0.5 size-6" />}
            </span>
          </button>
        ) : (
          <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-charcoal" aria-hidden="true">
            <Play className="ml-0.5 size-6" />
          </span>
        )}
      </div>
    </figure>
  );
}

export function Portfolio({ lang }: { lang: Locale }) {
  const { portfolio, ui } = getSite(lang);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="scroll-mt-16 bg-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={portfolio.eyebrow} title={portfolio.title} intro={portfolio.intro} />

        <Reveal className="mt-12">
          <h3 className="text-xl font-semibold text-cream">{portfolio.reelsTitle}</h3>
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {portfolio.reels.map((reel) => (
              <div key={reel.title} className="w-[68%] shrink-0 snap-center sm:w-auto">
                <ReelPhone reel={reel} lang={lang} />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h3 className="text-3xl font-semibold text-cream">{portfolio.comparison.title}</h3>
            <p className="mt-4 text-lg text-cream-muted/75">{portfolio.comparison.text}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider
              before={portfolio.comparison.before}
              after={portfolio.comparison.after}
              beforeLabel={portfolio.comparison.beforeLabel}
              afterLabel={portfolio.comparison.afterLabel}
              compareLabel={ui.compare(portfolio.comparison.beforeLabel, portfolio.comparison.afterLabel)}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="aspect-[4/3] rounded-3xl border border-border"
            />
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="text-xl font-semibold text-cream">{portfolio.gridTitle}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {portfolio.grid.map((photo, index) => (
              <li
                key={photo.src}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-2xl",
                  index === 0 && "col-span-2 aspect-[4/3] sm:row-span-2 sm:aspect-auto",
                  index === portfolio.grid.length - 1 && "hidden sm:block",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
