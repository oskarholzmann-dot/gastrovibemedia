"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Info, Megaphone, Star } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "cn";
import { usePackageSelection } from "@/components/package-selection";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getSite } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export function Packages({ lang }: { lang: Locale }) {
  const { packages, ui } = getSite(lang);
  const { selectedPackage, selectPackage } = usePackageSelection();
  const [showAdBudget, setShowAdBudget] = useState(false);
  const switchId = useId();

  const choose = (id: string) => {
    selectPackage(id);
    document.getElementById("anfrage")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pakete" aria-labelledby="pakete-title" className="scroll-mt-16 bg-slate-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={packages.eyebrow} title={packages.title} intro={packages.intro} align="center" />

        <Reveal className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-border bg-charcoal px-5 py-3">
          <Switch id={switchId} checked={showAdBudget} onCheckedChange={setShowAdBudget} />
          <label htmlFor={switchId} className="cursor-pointer text-sm font-medium text-cream">
            {packages.adBudgetSwitch}
          </label>
        </Reveal>

        <AnimatePresence>
          {showAdBudget && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-auto mt-4 flex max-w-2xl gap-2 overflow-hidden text-center text-sm text-cream-muted/75"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-amber-gold" aria-hidden="true" />
              {packages.adBudgetNote}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {packages.tiers.map((tier, index) => {
            const isSelected = selectedPackage === tier.id;

            return (
              <Reveal key={tier.id} delay={index * 0.08} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-7 sm:p-8",
                    tier.highlighted
                      ? "border-amber-gold bg-gradient-to-b from-accent to-charcoal shadow-[0_30px_80px_-30px_rgba(217,119,6,0.45)] lg:-my-4 lg:py-12"
                      : "border-border bg-charcoal",
                    isSelected && "ring-2 ring-copper",
                  )}
                >
                  {tier.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 h-6 -translate-x-1/2 gap-1 rounded-full bg-amber-gold px-3 font-semibold text-charcoal">
                      <Star className="size-3 fill-current" aria-hidden="true" />
                      {packages.highlightedLabel}
                    </Badge>
                  )}
                  <h3 className="text-2xl font-semibold text-cream">{tier.name}</h3>
                  <p className="mt-2 text-sm text-cream-muted/70">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-semibold text-cream">{tier.price}</span>
                    <span className="text-sm text-cream-muted/60">{tier.period}</span>
                  </p>

                  <AnimatePresence initial={false}>
                    {showAdBudget && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <span className="mt-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-cream-muted">
                          <Megaphone className="size-4 shrink-0 text-amber-gold" aria-hidden="true" />
                          {tier.adBudget ? `${ui.adBudgetPrefix} ${tier.adBudget}` : ui.noAdBudget}
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-[15px] text-cream-muted/90">
                        <Check className="mt-0.5 size-4.5 shrink-0 text-amber-gold" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => choose(tier.id)}
                    variant={tier.highlighted ? "default" : "outline"}
                    className={cn("group mt-8 h-12 rounded-full text-base font-semibold", !tier.highlighted && "border-cream/20 bg-transparent text-cream")}
                  >
                    {packages.cta}
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Button>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
