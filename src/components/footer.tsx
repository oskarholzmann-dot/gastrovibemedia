import { site } from "@/config/site";
import { Logo } from "./header";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-cream-muted/65">{site.footer.tagline}</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${site.brand.email}`} className="text-amber-gold hover:underline">
              {site.brand.email}
            </a>
            <br />
            <a href={`tel:${site.brand.phone.replace(/\s/g, "")}`} className="text-cream-muted/80 hover:text-cream">
              {site.brand.phone}
            </a>
          </p>
        </div>
        <nav aria-label="Seitenbereiche">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-cream-muted/50 uppercase">Seite</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-cream-muted/80 hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Social Media">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-cream-muted/50 uppercase">Social</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.socials
              .filter((social) => social.href)
              .map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-cream-muted/80 hover:text-cream">
                    {social.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-4 py-6 text-xs text-cream-muted/50 sm:px-6">
          <p>
            © {site.brand.copyrightYear} {site.brand.name}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex gap-5">
            {site.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
