import { cn } from "cn";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const isCentered = align === "center";

  return (
    <Reveal className={cn(isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      <p className="text-xs font-semibold tracking-[0.25em] text-amber-gold uppercase">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-tight font-semibold text-cream sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className={cn("mt-4 text-lg leading-relaxed text-cream-muted/75", isCentered && "mx-auto max-w-2xl")}>{intro}</p>}
    </Reveal>
  );
}
