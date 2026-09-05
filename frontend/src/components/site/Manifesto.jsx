import { CHAPTERS, IMAGES } from "../../data/site";
import { Reveal } from "./Reveal";

export const Manifesto = () => {
  return (
    <section className="bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">The Jarjus Way</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
            A small-town crew that treats every lawn like the front page.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 divide-y divide-edge border-t border-edge">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-6 sm:gap-10 py-8 sm:py-10">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-gold">{c.n}</span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-snug">{c.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed max-w-lg">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden rounded-sm">
                <img src={IMAGES.mowing} alt="Jarjus crew mowing a residential lawn" className="w-full h-[420px] sm:h-[560px] object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-brand text-gold-light px-6 py-5 rounded-sm max-w-[200px]">
                <p className="font-display text-3xl font-bold leading-none">100%</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gold-light/70">Locally owned & operated</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
