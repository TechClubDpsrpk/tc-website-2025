'use client';
import React, { useEffect, useState } from 'react';
import { Rocket, Handshake, Book } from 'lucide-react';
import { MagicCard } from '../magicui/magic-card';

type IntroProps = React.HTMLAttributes<HTMLElement>;

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-white" />,
    title: 'Ambitious Projects',
    description:
      "We start with a simple idea and somehow end up building a robot that may or may not follow commands. It's fine, it's innovation. Probably.",
    gradientFrom: '#ffffff',
    gradientTo: '#999999',
  },
  {
    icon: <Handshake className="h-8 w-8 text-yellow-400" />,
    title: 'Chaotic Collaboration',
    description:
      'We work together. Sometimes we even agree on things. Mostly, we just argue over tabs vs spaces — but hey, teamwork!',
    gradientFrom: '#facc15',
    gradientTo: '#fbbf24',
  },
  {
    icon: <Book className="h-8 w-8 text-green-400" />,
    title: 'Learning (Sort of)',
    description:
      "You'll learn new skills, break things, fix them again, and pretend that's how it was supposed to work. Growth!",
    gradientFrom: '#34d399',
    gradientTo: '#10b981',
  },
];

const Intro = ({ className, ...props }: IntroProps) => {
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleString());
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ['solutions', 'reality', 'impact'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting;

    if (!shouldDelete && displayText === currentWord) {
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (shouldDelete && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      setTimeout(
        () => {
          setDisplayText((prev) =>
            shouldDelete ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
          );
        },
        shouldDelete ? 250 : 300
      );
    }
  }, [displayText, wordIndex, isDeleting, words]);

  return (
    <>
      {/* Floating header info (NOT observed) */}
      <div className="absolute flex w-full justify-between p-4 font-[family-name:var(--font-space-mono)] text-sm text-zinc-500">
        <p>Est. 2015</p>
        <span suppressHydrationWarning>{currentTime}</span>
      </div>

      {/* THIS is what the navbar observes */}
      <section
        {...props}
        className={`min-h-screen bg-black px-6 pt-48 pb-32 text-white md:px-10 ${className ?? ''}`}
      >
        <div className="mx-auto max-w-6xl space-y-10 md:px-6 lg:px-24">
          <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="lg:items-center lg:justify-between">
              <h2 className="text-5xl font-light md:text-6xl">
                Where{' '}
                <span className="font-[family-name:monospace] font-medium md:text-6xl">ideas</span>{' '}
                turn into{' '}
              </h2>
              <span className="font-[family-name:monospace] font-medium md:text-6xl">
                {displayText}.
              </span>
            </div>

            <p className="max-w-2xl text-sm text-zinc-300">
              We come together to <span className="font-medium text-white">innovate</span>,{' '}
              <span className="font-medium text-white">collaborate</span>, and pretend we know what
              we’re doing. Whether you’re obsessed with AI, code, robots, or just making things look
              cool, this is the perfect place to overcommit, under-caffeinate, and accidentally
              invent the future.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, idx) => (
              <MagicCard
                key={idx}
                gradientFrom={feature.gradientFrom}
                gradientTo={feature.gradientTo}
                gradientColor="#262626"
                gradientOpacity={0.8}
                gradientSize={200}
              >
                <div className="flex h-full flex-col justify-between rounded-2xl p-6 shadow-md">
                  <div>
                    {feature.icon}
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-zinc-300">{feature.description}</p>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
