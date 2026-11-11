import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PackageSelectionProvider } from "@/components/package-selection";
import { ConversionHub } from "@/components/sections/conversion-hub";
import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Portfolio } from "@/components/sections/portfolio";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Services } from "@/components/sections/services";
import { hasLocale } from "@/config/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <PackageSelectionProvider>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <ProblemSolution lang={lang} />
        <Services lang={lang} />
        <Portfolio lang={lang} />
        <Packages lang={lang} />
        <ConversionHub lang={lang} />
      </main>
      <Footer lang={lang} />
    </PackageSelectionProvider>
  );
}
