import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AuroraText } from '../magicui/aurora-text';

const footerLinks = [
  {
    title: '(Tech Club)',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Core Team', href: '/core-team' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    title: '(Resources)',
    links: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'Announcements', href: '/announcements' },
      { label: 'Legacy', href: '/legacy' },
    ],
  },
];

const Footer = () => {
  return (
    <div className="flex w-screen flex-col justify-center">
      <p className="w-full text-left text-[20vw] leading-none font-bold tracking-tight">
        <AuroraText
          colors={['#fac924', '#e6b522', '#c09c2b', '#947d31', '#625a31', '#3c3b2d', '#1b1c22']}
        >
          Tech Club
        </AuroraText>
      </p>

      <div className="flex flex-row border px-24">
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col p-6">
            <Link href="/" className="font-[family-name:var(--font-vt)] text-xl font-medium">
              {section.title}
            </Link>

            {section.links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="group relative inline-flex w-fit items-center py-1 text-sm text-zinc-400 transition-all duration-300 hover:text-zinc-100"
              >
                <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {label}
                  {/* underline effect */}
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </span>

                <ArrowRight
                  className="ml-1 h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  strokeWidth={2}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
