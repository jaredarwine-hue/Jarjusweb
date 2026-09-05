import { Phone, MapPin } from "lucide-react";
import { BUSINESS, TOWNS, REVIEW_URL } from "../../data/site";

export const Footer = () => {
  return (
    <footer className="bg-night text-gold-light/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="font-display text-4xl sm:text-5xl font-bold text-gold-light leading-none">
              {BUSINESS.name}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gold-light/60">
              Locally owned lawn care and precision mowing serving Neoga and central Illinois.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold mb-4">Contact</p>
            <a href={BUSINESS.phoneHref} data-testid="footer-business-phone" className="flex items-center gap-2 hover:text-gold-light transition-colors">
              <Phone size={15} /> {BUSINESS.phoneDisplay}
            </a>
            <p data-testid="footer-business-address" className="mt-3 flex items-start gap-2 text-sm text-gold-light/70">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              <span>{BUSINESS.street}<br />{BUSINESS.cityStateZip}</span>
            </p>
            <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-gold-light">
              Read our Google reviews
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold mb-4">Service Area</p>
            <p className="text-sm leading-relaxed text-gold-light/70">
              {TOWNS.map((t) => t.name).join(", ")} — and the surrounding central Illinois communities.
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gold-light/50">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <p className="font-mono tracking-wider">Lawn care in Neoga, IL & central Illinois</p>
        </div>
      </div>
    </footer>
  );
};
