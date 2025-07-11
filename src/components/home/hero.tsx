'use client';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import EmblaCarousel from './hero/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { motion } from 'framer-motion'; // 🆕 Import motion
import './hero/embla.css';

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Hero = () => {
  return (
    <div className="flex min-h-[calc(100vh-128px)] flex-col">
      {/* Spacer */}
      <div className="h-20" />

      {/* Upper section with motion */}
      <motion.div
        className="flex flex-grow items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </motion.div>

      {/* CTA section */}
      <div className="flex flex-shrink-0 flex-col items-center justify-between gap-4 bg-zinc-800 p-8 md:flex-row">
        <p className="font-semibold text-white md:max-w-md">
          Welcome to our school tech club – where we pretend to fix things we broke ourselves. It's
          chaotic brilliance at its finest.
        </p>

        <button className="group relative flex w-full items-center justify-center overflow-hidden bg-yellow-500 px-6 py-3 font-[family-name:var(--font-space-mono)] text-sm text-black hover:border-[#fac924] hover:bg-black hover:text-[#fac924] md:w-96">
          <span className="relative z-10 flex items-center gap-2">
            JOIN US <ArrowRight width={16} height={16} />
          </span>

          <span className="absolute top-0 left-0 h-full w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
