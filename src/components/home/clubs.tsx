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
        <span className="inline-block pr-16">TECH FOR EVERYONE →</span>
        <span className="inline-block pr-16"> TECH FOR EVERYONE →</span>
        <span className="inline-block pr-16"> TECH FOR EVERYONE →</span>
      </motion.div>

      {/* Spacer */}
      <div className="my-10" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center justify-center text-left text-2xl text-black">
          <p>The tech club is the premier club</p>
        </div>
        <div className="flex items-center justify-center">
          <LineShadowText className="text-4xl font-bold text-black" shadowColor="#dfe1d7">
            Hello
          </LineShadowText>
        </div>
      </div>

      {/* Strip 2 - Scrolls Right (reverse) */}
    </section>
  );
};

export default Clubs;
