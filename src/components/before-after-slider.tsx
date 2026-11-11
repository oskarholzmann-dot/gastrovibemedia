"use client";

import { ChevronsLeftRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { cn } from "cn";
import type { Media } from "@/config/site";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Bildvergleich: Das „Vorher“-Bild liegt oben und wird links bis zum Regler
 * gezeigt. Bedienbar mit Maus, Touch und Tastatur; vertikales Wischen
 * scrollt auf dem Smartphone weiterhin die Seite.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  compareLabel,
  sizes = "100vw",
  className,
}: {
  before: Media;
  after: Media;
  beforeLabel: string;
  afterLabel: string;
  /** Screenreader-Beschriftung des Reglers. */
  compareLabel: string;
  sizes?: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [position, setPosition] = useState(50);

  const moveTo = (clientX: number) => {
    const bounds = container.current?.getBoundingClientRect();

    if (bounds) {
      setPosition(clamp(((clientX - bounds.left) / bounds.width) * 100));
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowRight: 5, PageDown: -20, PageUp: 20 };

    if (event.key in steps) {
      event.preventDefault();
      setPosition((current) => clamp(current + steps[event.key]));
    }
  };

  const imageStyle = (media: Media) => ({ filter: media.filter, transform: media.transform });

  return (
    <div
      ref={container}
      className={cn("relative cursor-ew-resize touch-pan-y overflow-hidden select-none", className)}
      onPointerDown={onPointerDown}
      onPointerMove={(event) => isDragging.current && moveTo(event.clientX)}
      onPointerUp={() => (isDragging.current = false)}
      onPointerCancel={() => (isDragging.current = false)}
    >
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" style={imageStyle(after)} draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" style={imageStyle(before)} draggable={false} />
      </div>

      <span
        className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-cream backdrop-blur transition-opacity"
        style={{ opacity: position > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute top-4 right-4 rounded-full bg-amber-gold px-3 py-1 text-xs font-semibold text-charcoal transition-opacity"
        style={{ opacity: position < 85 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-cream shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ left: `${position}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={compareLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-charcoal shadow-xl ring-4 ring-cream/25 focus-visible:ring-copper focus-visible:outline-none"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="size-5" aria-hidden="true" />
      </div>
    </div>
  );
}
