import { ArrowRight } from 'lucide-react';
import React from 'react';

const Hero = () => {
  return (
    <div className="flex min-h-[calc(100vh-128px)] flex-col">
      {/* Upper section - takes remaining space */}
      <div className="flex flex-grow items-center justify-center p-8">
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
      </div>

      {/* Lower section - takes only as much height as it needs */}
      <div className="flex flex-shrink-0 flex-col items-center justify-between gap-4 bg-zinc-800 p-8 md:flex-row">
        {/* Text */}
        <p className="font-semibold text-white md:max-w-md">
          Welcome to our school tech club – where we pretend to fix things we broke ourselves. It's
          chaotic brilliance at its finest.
        </p>

        {/* Button */}
        <button className="hover:text-#fac924 relative flex w-full items-center justify-center overflow-hidden bg-yellow-500 px-6 py-3 font-[family-name:var(--font-space-mono)] text-sm text-black hover:border-[#fac924] hover:bg-black hover:text-[#fac924] md:w-96">
          <span className="relative z-10 flex items-center gap-2">
            JOIN US <ArrowRight width={16} height={16} />
          </span>

          <span
            className="absolute top-0 left-0 h-full w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full"
            style={{ zIndex: 0 }}
          />
        </button>
      </div>
    </div>
  );
};

export default Hero;
