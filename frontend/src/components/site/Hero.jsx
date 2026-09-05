import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { BUSINESS, IMAGES } from "../../data/site";

const EASE = [0.22, 1, 0.36, 1];
const LINES = ["Agrarian turf care,", "crafted for", "Central Illinois."];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.25 + i * 0.14, ease: EASE },
  }),
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-night">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-0">
        <img src={IMAGES.hero} alt="Freshly mowed striped lawn corridor" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/20" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pb-14 sm:pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Est. Neoga, Illinois</span>
          <span className="h-px w-14 bg-gold/50" />
        </motion.div>

        <h1 className="font-display font-bold text-gold-light tracking-tight leading-[0.98] text-5xl sm:text-7xl lg:text-8xl">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span custom={i} variants={lineVariants} initial="hidden" animate="show" className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          className="mt-8 max-w-xl text-lg sm:text-xl text-base/90 text-white/80 leading-relaxed"
        >
          Precision mowing, edging, and yard care for homes and acreage across Neoga
          and central Illinois. Straight lines, clean edges, and a crew that shows up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE }}
          className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="#contact"
            data-testid="hero-get-quote-button"
            className="group inline-flex items-center gap-2 rounded-full bg-gold text-night px-7 py-4 font-semibold hover:bg-gold-light transition-colors"
          >
            Get a free quote
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={BUSINESS.phoneHref}
            data-testid="hero-call-button"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 text-gold-light px-7 py-4 font-medium hover:bg-white/10 transition-colors"
          >
            <Phone size={17} /> {BUSINESS.phoneDisplay}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60"
        >
          <MapPin size={13} className="text-gold" /> {BUSINESS.street}, {BUSINESS.cityStateZip}
        </motion.div>
      </div>
    </section>
  );
};
