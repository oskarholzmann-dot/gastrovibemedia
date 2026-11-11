import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { getSite, hasLocale, localePath, locales } from "@/config/i18n";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const site = getSite(lang);

  return {
    metadataBase: new URL("https://gastrovibemedia.vercel.app"),
    title: site.meta.title,
    description: site.hero.subheadline,
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale)])),
    },
    openGraph: {
      title: site.meta.title,
      description: site.hero.subheadline,
      images: [site.hero.image.src],
      locale: site.meta.ogLocale,
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#121212",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className={`dark ${playfair.variable} ${jakarta.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
