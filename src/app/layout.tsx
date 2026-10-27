import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const title = `${site.brand.name} — Mehr Gäste. Ausgebuchte Tische. Starker Content.`;

export const metadata: Metadata = {
  title,
  description: site.hero.subheadline,
  openGraph: {
    title,
    description: site.hero.subheadline,
    images: [site.hero.image.src],
    locale: "de_DE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`dark ${playfair.variable} ${jakarta.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
