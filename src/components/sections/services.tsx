"use client";

import { Camera, Check, MessagesSquare, MonitorSmartphone, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { site } from "@/config/site";

const icons: Record<string, LucideIcon> = {
  camera: Camera,
  messages: MessagesSquare,
  trending: TrendingUp,
  monitor: MonitorSmartphone,
};

export function Services() {
  const { services } = site;

  return (
    <section id="leistungen" aria-labelledby="leistungen-title" className="scroll-mt-16 bg-slate-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} intro={services.intro} />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {services.items.map((service, index) => {
            const Icon = icons[service.icon];

            return (
              <li key={service.title}>
                <Reveal delay={(index % 2) * 0.1} className="h-full">
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
                    <Card className="group relative h-full overflow-hidden rounded-3xl border border-border bg-charcoal p-7 ring-0 transition-colors hover:border-amber-gold/50 sm:p-8">
                      <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-copper/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="flex items-center gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-gold/12 text-amber-gold ring-1 ring-amber-gold/30 transition-colors group-hover:bg-amber-gold group-hover:text-charcoal">
                          <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                        </span>
                        <h3 className="text-2xl leading-tight font-semibold text-cream">{service.title}</h3>
                      </div>
                      <ul className="mt-6 space-y-2.5">
                        {service.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-[15px] text-cream-muted/80">
                            <Check className="mt-1 size-4 shrink-0 text-copper" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
