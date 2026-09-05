import { Star, ArrowUpRight } from "lucide-react";
import { REVIEW_URL, IMAGES, BUSINESS, RATING } from "../../data/site";
import { Reveal } from "./Reveal";

export const Testimonials = () => {
  return (
    <section id="reviews" className="relative bg-brand py-24 sm:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-[0.14]">
        <img src={IMAGES.stripes} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <Reveal>
          <div
            data-testid="google-rating-badge"
            className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-night/40 backdrop-blur-md pl-4 pr-5 py-2 mb-8"
            aria-label={`Rated ${RATING.value} out of 5 on Google from ${RATING.count} reviews`}
          >
            <span className="grid place-items-center w-7 h-7 rounded-full bg-gold-light text-night font-sans text-sm font-bold" aria-hidden="true">G</span>
            <span className="font-display text-2xl font-bold text-gold-light leading-none" data-testid="google-rating-value">{RATING.value}</span>
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-light/70" data-testid="google-rating-count">
              {RATING.count} Google reviews
            </span>
          </div>
          <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Reviews</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-gold-light tracking-tight leading-tight">
            Neighbors across central Illinois trust their lawns to us.
          </h2>
          <p className="mt-6 text-gold-light/80 leading-relaxed">
            Don't just take our word for it — see what {BUSINESS.short} customers are saying
            on our Google Business profile, and leave a review of your own.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="read-reviews-google-button"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold text-night px-8 py-4 font-semibold hover:bg-gold-light transition-colors"
          >
            Read our reviews on Google
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
