import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { About } from "@/components/sections/about";
import { getSite, hasLocale, locales, pagePath } from "@/config/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/ueber-uns">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const { about, meta } = getSite(lang);

  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: {
      canonical: pagePath(lang, "about"),
      languages: Object.fromEntries(locales.map((locale) => [locale, pagePath(locale, "about")])),
    },
    openGraph: {
      title: about.metaTitle,
      description: about.metaDescription,
      images: [about.photo.src],
      locale: meta.ogLocale,
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/ueber-uns">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <>
      <Header lang={lang} page="about" />
      <main>
        <About lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
