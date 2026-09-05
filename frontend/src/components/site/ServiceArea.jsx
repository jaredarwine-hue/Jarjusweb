import { MapPin, Phone } from "lucide-react";
import { TOWNS, BUSINESS, IMAGES } from "../../data/site";
import { Reveal } from "./Reveal";

export const ServiceArea = () => {
  return (
    <section id="service-area" className="bg-surface-alt py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Where We Mow</span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
              Proudly serving central Illinois.
            </h2>
            <p className="mt-5 text-muted leading-relaxed max-w-lg">
              Based in Neoga, we cover the surrounding central Illinois communities.
              If your town is on the list, we'd be glad to give your lawn a look.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 grid grid-cols-2 sm:grid-cols-2 gap-px bg-edge border border-edge rounded-sm overflow-hidden">
              {TOWNS.map((t) => (
                <div
                  key={t.name}
                  data-testid={t.testId}
                  className="flex items-center gap-3 bg-base px-5 py-4 hover:bg-brand hover:text-gold-light group transition-colors"
                >
                  <MapPin size={16} className="text-gold shrink-0" />
                  <span className="font-display text-xl font-bold text-ink group-hover:text-gold-light transition-colors">
                    {t.name}, IL
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={BUSINESS.phoneHref}
              className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover"
            >
              <Phone size={17} /> Not sure you're covered? Call {BUSINESS.phoneDisplay}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-sm">
            <img src={IMAGES.field} alt="Central Illinois rural landscape" className="w-full h-[380px] sm:h-[520px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-gold-light">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Home base</p>
              <p className="mt-1 font-display text-2xl font-bold">{BUSINESS.street}</p>
              <p className="font-display text-2xl font-bold">{BUSINESS.cityStateZip}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
