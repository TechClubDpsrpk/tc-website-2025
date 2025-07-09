'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LineShadowText } from '../magicui/line-shadow-text';

const Clubs = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Parallax movement speeds
  const xFast = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const xSlow = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen overflow-hidden bg-[#dfe1d7] px-4 py-20"
    >
      {/* Strip 1 - Scrolls Left (like moving forward) */}
      <motion.div
        style={{ x: xFast }}
        className="text-[12vw] font-bold whitespace-nowrap text-black uppercase italic"
      >
        <span className="inline-block pr-16">
          <LineShadowText>TECH FOR EVERYONE →</LineShadowText>
        </span>
        <span className="inline-block pr-16">MOVING IN THIS DIRECTION →</span>
        <span className="inline-block pr-16">MOVING IN THIS DIRECTION →</span>
      </motion.div>

      {/* Spacer */}
      <div className="my-20" />

      {/* Strip 2 - Scrolls Right (reverse) */}
      <motion.div
        style={{ x: xSlow }}
        className="text-[12vw] font-bold whitespace-nowrap text-black uppercase"
      >
        <span className="inline-block pr-16">← BACKWARDS TOO</span>
        <span className="inline-block pr-16">← BACKWARDS TOO</span>
        <span className="inline-block pr-16">← BACKWARDS TOO</span>
        <span className="inline-block pr-16">← BACKWARDS TOO</span>
        <span className="inline-block pr-16">← BACKWARDS TOO</span>
      </motion.div>
    </section>
  );
};

export default Clubs;
