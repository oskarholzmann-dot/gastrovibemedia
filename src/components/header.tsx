"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";

export function Logo() {
  return (
    <a href="#top" className="flex items-baseline gap-1.5 text-cream" aria-label={`${site.brand.name} – zum Seitenanfang`}>
      <span className="font-heading text-xl font-semibold sm:text-2xl">
        Gastro<span className="text-amber-gold">Vibe</span>
      </span>
      <span className="text-[10px] font-semibold tracking-[0.3em] text-cream-muted/60 uppercase">Media</span>
    </a>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled || isMenuOpen ? "border-b border-border bg-charcoal/90 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:h-18 sm:px-6">
        <Logo />
        <nav aria-label="Hauptnavigation" className="ml-auto hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm font-medium text-cream-muted/80 transition-colors hover:text-cream">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#anfrage" className={cn(buttonVariants(), "ml-auto hidden h-10 rounded-full px-5 font-semibold sm:inline-flex lg:ml-0")}>
          {site.hero.primaryCta}
        </a>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto flex size-10 items-center justify-center rounded-full border border-border text-cream sm:ml-0 lg:hidden"
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-6">
              {site.nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3 font-heading text-2xl text-cream hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#anfrage"
                onClick={() => setIsMenuOpen(false)}
                className={cn(buttonVariants(), "mt-3 h-12 rounded-full text-base font-semibold")}
              >
                {site.hero.primaryCta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
