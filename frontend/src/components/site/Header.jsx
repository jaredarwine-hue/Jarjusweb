import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { BUSINESS } from "../../data/site";

const NAV = [
  { label: "Services", href: "#services", testId: "header-nav-services" },
  { label: "Pricing", href: "#pricing", testId: "header-nav-pricing" },
  { label: "Seasonal", href: "#seasonal", testId: "header-nav-seasonal" },
  { label: "Gallery", href: "#gallery", testId: "header-nav-gallery" },
  { label: "Service Area", href: "#service-area", testId: "header-nav-service-area" },
  { label: "Reviews", href: "#reviews", testId: "header-nav-testimonials" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-base/90 backdrop-blur-md border-b border-edge" : "bg-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="header-brand-logo"
          className="flex items-center gap-2.5 group"
        >
          <span className="grid place-items-center w-9 h-9 rounded-full bg-brand text-gold-light font-display text-xl leading-none">J</span>
          <span className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {BUSINESS.short}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={n.testId}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-brand transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            data-testid="header-call-button"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-brand border border-brand/30 rounded-full px-4 py-2 hover:bg-brand hover:text-gold-light transition-colors"
          >
            <Phone size={13} /> {BUSINESS.phoneDisplay}
          </a>
          <a
            href="#contact"
            data-testid="header-quote-button"
            className="hidden sm:inline-flex items-center rounded-full bg-brand text-gold-light px-5 py-2.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
          >
            Get a Quote
          </a>
          <button
            className="md:hidden text-ink"
            onClick={() => setOpen((v) => !v)}
            data-testid="header-mobile-toggle"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-base border-t border-edge px-5 py-5 flex flex-col gap-4" data-testid="header-mobile-menu">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-ink"
            >
              {n.label}
            </a>
          ))}
          <a href={BUSINESS.phoneHref} className="font-semibold text-brand flex items-center gap-2">
            <Phone size={15} /> {BUSINESS.phoneDisplay}
          </a>
          <a href="#contact" onClick={() => setOpen(false)} className="inline-flex justify-center rounded-full bg-brand text-gold-light px-5 py-3 text-sm font-semibold">
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
};
