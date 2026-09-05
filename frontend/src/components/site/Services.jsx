import { ArrowUpRight, Check } from "lucide-react";
import { TIERS, EXTRAS } from "../../data/site";
import { Reveal } from "./Reveal";

export const Services = () => {
  return (
    <section id="services" className="bg-night py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Mowing Services & Pricing</span>
          <h2 id="pricing" className="mt-5 font-display text-4xl sm:text-5xl font-bold text-gold-light tracking-tight leading-tight scroll-mt-24">
            Straight-line mowing, priced by the acre.
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            Every visit includes mowing, trimming, and edging. Prices start where the acreage
            begins — the final number comes from a quick look at your lot.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {TIERS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <div
                data-testid={t.testId}
                className="group h-full flex flex-col rounded-sm border border-white/10 bg-white/[0.03] p-7 sm:p-8 hover:border-gold/50 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{t.index}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Mowing</span>
                </div>

                <h3 className="mt-7 font-display text-2xl font-bold text-gold-light">{t.label}</h3>
                <p className="mt-3 text-sm text-white/65 leading-relaxed min-h-[66px]">{t.blurb}</p>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Starting at</p>
                  <p className="mt-1 font-display text-4xl font-bold text-gold-light">{t.range}</p>
                </div>

                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center justify-between gap-2 rounded-full bg-gold text-night px-5 py-3 text-sm font-semibold hover:bg-gold-light transition-colors"
                >
                  Get a quote
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p
            data-testid="pricing-disclaimer-note"
            className="mt-8 text-sm text-white/55 font-mono tracking-wide max-w-2xl"
          >
            * Final quotes depend on lot size and condition. Overgrown, sloped, or heavily
            obstructed yards may price higher — we'll confirm before we start.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {EXTRAS.map((e) => (
              <span key={e} className="inline-flex items-center gap-2 text-sm text-white/80">
                <Check size={16} className="text-gold" /> {e}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
