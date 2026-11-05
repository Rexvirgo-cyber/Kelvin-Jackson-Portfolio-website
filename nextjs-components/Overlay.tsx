'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export const Overlay: React.FC<OverlayProps> = ({ scrollYProgress }) => {
  // Section 1 (0% - 22% scroll): Lower-left identity
  const opacity0 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.22], [1, 1, 0.8, 0]);
  const y0 = useTransform(scrollYProgress, [0, 0.22], [0, -20]);

  // Section 2 (26% - 48% scroll): Lower-left 2 lines max
  const opacity1 = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.24, 0.28, 0.48], [20, 0, -15]);

  // Section 3 (52% - 74% scroll): Lower-right 2 lines max
  const opacity2 = useTransform(scrollYProgress, [0.50, 0.54, 0.70, 0.74], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.50, 0.54, 0.74], [20, 0, -15]);

  // Section 4 (78% - 96% scroll): Lower-left closing
  const opacity3 = useTransform(scrollYProgress, [0.76, 0.80, 0.94, 0.98], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.76, 0.80, 0.98], [20, 0, -15]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Section 1 (0%): Docked Lower-Left, No Box */}
      <motion.div
        style={{ opacity: opacity0, y: y0 }}
        className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 lg:left-16 max-w-lg text-left"
      >
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#C6A77B] font-semibold mb-1.5 block">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77B]" />
          Lagos, Nigeria &bull; Professional Profile
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1EFEA] leading-tight mb-1">
          KELVIN JACKSON <span className="text-[#C6A77B] font-normal">CHEZIEUCHE</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-medium max-w-md line-clamp-2 mb-3">
          Customer Service &amp; Administrative Professional &bull; Good customer experiences start with good people.
        </p>
        <div className="flex items-center gap-3 pointer-events-auto">
          <a href="#projects" className="px-4 py-2 rounded-full bg-[#C6A77B] text-[#06080C] font-semibold text-[11px] uppercase tracking-wider">
            Explore Work
          </a>
          <a href="#contact" className="px-4 py-2 rounded-full border border-[#C6A77B]/40 text-[#F1EFEA] text-[11px] uppercase tracking-wider">
            Get In Touch
          </a>
        </div>
      </motion.div>

      {/* Section 2 (30%): Docked Lower-Left, No Box, 2-line max */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute bottom-10 sm:bottom-16 left-6 sm:left-12 lg:left-16 max-w-sm sm:max-w-md text-left"
      >
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#C6A77B] uppercase font-semibold block mb-1">
          01 &bull; Core Philosophy
        </span>
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F1EFEA] leading-snug">
          Communication. Understanding.<br />
          <span className="text-[#C6A77B] font-normal">Consistent Follow-Through.</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-[#94A3B8] mt-1.5 font-sans">
          Turning 40–60 daily interactions into lasting customer trust.
        </p>
      </motion.div>

      {/* Section 3 (60%): Docked Lower-Right, No Box, 2-line max */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute bottom-10 sm:bottom-16 right-6 sm:right-12 lg:right-16 max-w-sm sm:max-w-md text-left sm:text-right"
      >
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#C6A77B] uppercase font-semibold block mb-1">
          02 &bull; Value Creation
        </span>
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F1EFEA] leading-snug">
          Supporting People &amp; Operations.<br />
          <span className="text-[#C6A77B] font-normal">Enabling Business Growth.</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-[#94A3B8] mt-1.5 font-sans">
          Bridging front-line care with disciplined administrative execution.
        </p>
      </motion.div>

      {/* Section 4 (90%): Docked Lower-Left, No Box, 2-line max */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute bottom-10 sm:bottom-16 left-6 sm:left-12 lg:left-16 max-w-sm sm:max-w-md text-left pointer-events-auto"
      >
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#C6A77B] uppercase font-semibold block mb-1">
          03 &bull; Commitment
        </span>
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F1EFEA] leading-snug mb-2">
          Making Every Interaction Count.<br />
          <span className="text-[#C6A77B] font-normal">Ready to Contribute to Your Team.</span>
        </h2>
        <a href="#projects" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C6A77B] hover:text-[#DFC8A7] uppercase tracking-wider">
          <span>Explore Case Studies &amp; Journey &darr;</span>
        </a>
      </motion.div>
    </div>
  );
};
