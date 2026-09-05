import { ArrowUpRight, Leaf, Sprout, Wind } from "lucide-react";
import { SEASONAL, BUSINESS } from "../../data/site";
import { Reveal } from "./Reveal";

const ICONS = { "spring-cleanup": Sprout, "leaf-cleanup": Leaf, "fall-cleanup": Wind };

export const Seasonal = () => {
  return (
    <section id="seasonal" className="bg-surface-alt py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Seasonal Services</span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
              Year-round care, not just the mowing months.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-muted leading-relaxed">
              Spring wake-ups and fall clean-outs keep a central Illinois yard healthy between
              cuts. Every seasonal job is quoted on your lot — call {BUSINESS.phoneDisplay} or
              send the form and we'll walk it with you.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {SEASONAL.map((s, i) => {
            const Icon = ICONS[s.id];
            return (
              <Reveal key={s.id} delay={i * 0.1}>
                <div
                  data-testid={s.testId}
                  className="group h-full flex flex-col bg-base border border-edge rounded-sm p-7 sm:p-8 hover:border-brand/40 hover:-translate-y-1 transition-[border-color,transform] duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-brand text-gold-light">
                      <Icon size={19} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{s.season}</span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl sm:text-3xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{s.body}</p>
                  <div className="mt-6 pt-6 border-t border-edge flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Quoted per lot</span>
                    <a
                      href="#contact"
                      data-testid={`${s.testId}-quote-link`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
                    >
                      Get a quote
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
