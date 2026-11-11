import { cn } from "cn";
import { getSite, localePath } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

function UnionJack() {
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full" aria-hidden="true">
      <clipPath id="union-jack-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#union-jack-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function GermanFlag() {
  return (
    <svg viewBox="0 0 5 3" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

/** Wechselt zur jeweils anderen Sprache: auf Deutsch zeigt er die englische Flagge und umgekehrt. */
export function LanguageSwitch({ lang, className }: { lang: Locale; className?: string }) {
  const target: Locale = lang === "de" ? "en" : "de";

  return (
    <a
      href={localePath(target)}
      hrefLang={target}
      lang={target}
      aria-label={getSite(lang).ui.switchLanguage}
      title={getSite(lang).ui.switchLanguage}
      className={cn(
        "flex h-10 items-center gap-2 rounded-full border border-border px-3 text-xs font-semibold tracking-wider text-cream uppercase transition-colors hover:border-cream/40 hover:bg-white/5",
        className,
      )}
    >
      <span className="block h-3.5 w-5 overflow-hidden rounded-[3px] ring-1 ring-white/20">{target === "en" ? <UnionJack /> : <GermanFlag />}</span>
      {target}
    </a>
  );
}
