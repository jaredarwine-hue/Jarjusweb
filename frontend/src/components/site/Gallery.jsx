import { useState } from "react";
import { MapPin } from "lucide-react";
import { GALLERY } from "../../data/site";
import { Reveal } from "./Reveal";

const Compare = ({ item }) => {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative select-none">
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-night">
        <img src={item.after} alt={`Freshly mowed lawn in ${item.town}`} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <img
          src={item.before}
          alt={`Overgrown lawn before mowing in ${item.town}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <div className="absolute inset-y-0 w-0.5 bg-gold-light pointer-events-none" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-gold-light text-night shadow-lg font-mono text-[10px] tracking-widest">
            ‹ ›
          </span>
        </div>
        <span className="absolute top-4 left-4 rounded-full bg-night/70 backdrop-blur-sm text-gold-light font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 pointer-events-none">Before</span>
        <span className="absolute top-4 right-4 rounded-full bg-gold text-night font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 pointer-events-none">After</span>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after for ${item.town}`}
          data-testid={`${item.testId}-slider`}
          className="compare-range absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-display text-xl font-bold text-ink">
          <MapPin size={15} className="text-gold" /> {item.town}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{item.lot}</span>
      </div>
    </div>
  );
};

export const Gallery = () => {
  return (
    <section id="gallery" className="bg-base py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Before & After</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
            Real yards across central Illinois. Drag to see the difference.
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            From tight town lots to full country acreage — the same crew, the same
            straight lines, every time.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.1}>
              <div data-testid={g.testId}>
                <Compare item={g} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
