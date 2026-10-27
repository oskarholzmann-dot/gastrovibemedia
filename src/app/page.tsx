import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PackageSelectionProvider } from "@/components/package-selection";
import { ConversionHub } from "@/components/sections/conversion-hub";
import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Portfolio } from "@/components/sections/portfolio";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <PackageSelectionProvider>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Services />
        <Portfolio />
        <Packages />
        <ConversionHub />
      </main>
      <Footer />
    </PackageSelectionProvider>
  );
}
