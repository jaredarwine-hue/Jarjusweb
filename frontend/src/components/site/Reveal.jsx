import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, className, delay = 0, y = 26 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
