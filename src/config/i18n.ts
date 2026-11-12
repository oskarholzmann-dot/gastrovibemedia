import { site } from "./site";
import type { SiteContent } from "./site";
import { siteEn } from "./site.en";

/**
 * Sprachen der Seite. Deutsch liegt unter „/“, Englisch unter „/en“
 * (siehe rewrites/redirects in next.config.ts).
 */
export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

const content: Record<Locale, SiteContent> = { de: site, en: siteEn };

export const hasLocale = (value: unknown): value is Locale => locales.includes(value as Locale);

export const getSite = (locale: Locale): SiteContent => content[locale];

export const localePath = (locale: Locale): string => (locale === defaultLocale ? "/" : `/${locale}`);

/** Seiten mit eigener URL je Sprache (siehe rewrites/redirects in next.config.ts). */
export type PageKey = "home" | "about";

const pagePaths: Record<PageKey, Record<Locale, string>> = {
  home: { de: "/", en: "/en" },
  about: { de: "/ueber-uns", en: "/en/about" },
};

export const pagePath = (locale: Locale, page: PageKey = "home"): string => pagePaths[page][locale];

/** Link zu einem Abschnitt der Startseite, funktioniert auch von Unterseiten aus. */
export const sectionPath = (locale: Locale, sectionId: string): string => `${localePath(locale)}#${sectionId}`;
