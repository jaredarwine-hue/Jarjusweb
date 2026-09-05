import { TOWNS } from "../../data/site";

export const Marquee = () => {
  const items = [...TOWNS, ...TOWNS];
  return (
    <section aria-label="Service towns" className="bg-brand py-5 sm:py-6 overflow-hidden border-y border-black/10">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 sm:px-9">
            <span className="font-display text-2xl sm:text-4xl font-bold text-gold-light/90">{t.name}, IL</span>
            <span className="mx-6 sm:mx-9 text-gold text-xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
