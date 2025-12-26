'use client';

import React from 'react';
import { motion } from 'framer-motion';

const teamStructure = {
  president: { name: 'Arghya Sarkar', role: 'President', image: '/team/arghya.jpg' },
  vicePresident: { name: 'Ankush Roy', role: 'Vice President', image: '/team/ankush.jpg' },
  mentors: [
    { name: 'Anshuman Tripathi', image: '/team/anshuman.jpg' },
    { name: 'Parthiv Pal', image: '/team/parthiv.jpg' },
    { name: 'Soham Sen', image: '/team/soham.jpg' },
    { name: 'Soumili Dey', image: '/team/soumili.jpg' },
    { name: 'Rishabh Das', image: '/team/rishabh.jpg' },
    { name: 'Avanindra Chakraborty', image: '/team/avanindra.jpg' },
    { name: 'Shameek Dalal', image: '/team/shameek.jpg' },
    { name: 'Naitik Chattaraj', image: '/team/naitik.jpg' },
    { name: 'Sampreet Roy', image: '/team/sampreet.jpg' },
  ],
  offstageExecutives: [
    { name: 'Swapnil Basu', image: '/team/swapnil.jpg' },
    { name: 'Aryaka Sikdar', image: '/team/aryaka.jpg' },
  ],
  creativeHeads: [
    { name: 'Prithuraj Saha', role: 'Video', image: '/team/prithuraj.jpg' },
    { name: 'Adiya Roy', role: 'Graphics', image: '/team/adiya.jpg' },
    { name: 'Niharika Paul', role: 'Graphics', image: '/team/niharika.jpg' },
    { name: 'Aritro Sen', role: 'PR Executive', image: '/team/aritro.jpg' },
  ],
};

const MemberCard = ({ member, role }: { member: { name: string; image: string; role?: string }; role?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center"
  >
    <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 overflow-hidden rounded-full border-2 sm:border-3 lg:border-4 border-yellow-400 bg-gray-800">
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=fbbf24&color=000&size=96`;
        }}
      />
    </div>
    <div className="mt-1 sm:mt-2 text-center max-w-[80px] sm:max-w-[100px]">
      <p className="font-[family-name:var(--font-space-mono)] text-[10px] sm:text-xs lg:text-sm font-semibold text-white leading-tight">
        {member.name}
      </p>
      {(role || member.role) && (
        <p className="font-[family-name:var(--font-vt)] text-[8px] sm:text-[10px] lg:text-xs text-yellow-400">
          {role || member.role}
        </p>
      )}
    </div>
  </motion.div>
);

const VerticalLine = ({ height = 'h-12' }: { height?: string }) => (
  <div className={`mx-auto w-0.5 bg-yellow-400 ${height}`} />
);

const VerticalLineMobile = ({ height = 'h-6' }: { height?: string }) => (
  <div className={`mx-auto w-0.5 bg-yellow-400 ${height}`} />
);

// T-junction connector component
const TJunction = () => (
  <div className="relative w-full h-16">
    {/* Vertical line coming down */}
    <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-yellow-400 -translate-x-1/2" />
    {/* Horizontal line */}
    <div className="absolute left-1/4 right-1/4 top-8 h-0.5 bg-yellow-400" />
    {/* Left vertical line going down */}
    <div className="absolute left-1/4 top-8 w-0.5 h-8 bg-yellow-400" />
    {/* Right vertical line going down */}
    <div className="absolute right-1/4 top-8 w-0.5 h-8 bg-yellow-400" />
  </div>
);

// Four-way split connector for creative heads
const FourWaySplit = () => (
  <div className="relative w-full h-16">
    {/* Vertical line coming down */}
    <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-yellow-400 -translate-x-1/2" />
    {/* Horizontal line spanning all four positions */}
    <div className="absolute left-0 right-0 top-8 h-0.5 bg-yellow-400" />
    {/* Four vertical lines going down */}
    <div className="absolute left-[12.5%] top-8 w-0.5 h-8 bg-yellow-400" />
    <div className="absolute left-[37.5%] top-8 w-0.5 h-8 bg-yellow-400" />
    <div className="absolute left-[62.5%] top-8 w-0.5 h-8 bg-yellow-400" />
    <div className="absolute left-[87.5%] top-8 w-0.5 h-8 bg-yellow-400" />
  </div>
);

export default function TechClubTeamsPage() {
  return (
    <section className="min-h-screen px-6 py-24 text-white md:px-18 lg:px-42">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-[family-name:var(--font-vt)] text-2xl sm:text-4xl lg:text-6xl leading-tight font-extrabold tracking-tight">
            TECH CLUB BOARD 2025–26
          </h2>
          <p className="mt-2 sm:mt-4 font-[family-name:var(--font-space-mono)] text-xs sm:text-sm lg:text-base text-zinc-400">
            Passionate minds crafting innovation, code, and design.
          </p>
        </div>

        {/* Flowchart Structure */}
        <div className="mt-8 sm:mt-16 flex flex-col items-center space-y-0">
          {/* President */}
          <MemberCard member={teamStructure.president} role="President" />
          <VerticalLine />
          <VerticalLineMobile />

          {/* Vice President */}
          <MemberCard member={teamStructure.vicePresident} role="Vice President" />
          <VerticalLine height="h-16" />
          <VerticalLineMobile height="h-8" />

          {/* Split into two branches - Desktop */}
          <div className="relative w-full hidden lg:block">
            {/* T-Junction connecting to two branches */}
            <TJunction />
            
            <div className="flex items-start justify-center">
              {/* Left Branch - Mentors */}
              <div className="flex flex-col items-center w-1/2">
                <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-6 py-2">
                  <p className="font-[family-name:var(--font-vt)] text-sm font-bold text-yellow-400">
                    MENTORS
                  </p>
                </div>
                <VerticalLine height="h-8" />

                {/* Mentors Grid - 3x3 */}
                <div className="grid grid-cols-3 gap-x-12 gap-y-8">
                  {teamStructure.mentors.map((mentor, idx) => (
                    <MemberCard key={idx} member={mentor} />
                  ))}
                </div>
              </div>

              {/* Right Branch - Executives */}
              <div className="flex flex-col items-center w-1/2">
                {/* Offstage Executives with T-junction */}
                <div className="relative w-full h-16">
                  {/* Horizontal line for two executives */}
                  <div className="absolute left-1/4 right-1/4 top-0 h-0.5 bg-yellow-400" />
                  {/* Left executive line */}
                  <div className="absolute left-1/4 top-0 w-0.5 h-16 bg-yellow-400" />
                  {/* Right executive line */}
                  <div className="absolute right-1/4 top-0 w-0.5 h-16 bg-yellow-400" />
                </div>

                <div className="flex gap-24 w-full justify-center">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-4 py-2">
                      <p className="font-[family-name:var(--font-vt)] text-xs font-bold text-yellow-400 whitespace-nowrap">
                        OFFSTAGE EXECUTIVE
                      </p>
                    </div>
                    <VerticalLine height="h-8" />
                    <MemberCard member={teamStructure.offstageExecutives[0]} />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-4 py-2">
                      <p className="font-[family-name:var(--font-vt)] text-xs font-bold text-yellow-400 whitespace-nowrap">
                        OFFSTAGE EXECUTIVE
                      </p>
                    </div>
                    <VerticalLine height="h-8" />
                    <MemberCard member={teamStructure.offstageExecutives[1]} />
                  </div>
                </div>

                <VerticalLine height="h-12" />

                {/* Four-way split for creative heads */}
                <div className="w-full">
                  <FourWaySplit />
                  
                  {/* Creative Heads Row */}
                  <div className="flex justify-between px-4">
                    {teamStructure.creativeHeads.map((head, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-3 py-2">
                          <p className="font-[family-name:var(--font-vt)] whitespace-nowrap text-[10px] font-bold text-yellow-400">
                            {head.role === 'Video'
                              ? 'CREATIVE HEAD (VIDEO)'
                              : head.role === 'Graphics'
                                ? 'CREATIVE HEAD (GRAPHICS)'
                                : 'PR EXECUTIVE'}
                          </p>
                        </div>
                        <VerticalLine height="h-8" />
                        <MemberCard member={head} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="w-full lg:hidden space-y-8">
            {/* Mentors Section */}
            <div className="flex flex-col items-center">
              <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-4 sm:px-6 py-1.5 sm:py-2">
                <p className="font-[family-name:var(--font-vt)] text-xs sm:text-sm font-bold text-yellow-400">
                  MENTORS
                </p>
              </div>
              <VerticalLineMobile height="h-6" />

              {/* Mentors Grid - Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-6">
                {teamStructure.mentors.map((mentor, idx) => (
                  <MemberCard key={idx} member={mentor} />
                ))}
              </div>
            </div>

            {/* Offstage Executives */}
            <div className="flex flex-col items-center space-y-6">
              <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-3 sm:px-4 py-1.5 sm:py-2">
                <p className="font-[family-name:var(--font-vt)] text-xs sm:text-sm font-bold text-yellow-400">
                  OFFSTAGE EXECUTIVES
                </p>
              </div>
              <div className="flex gap-8 sm:gap-12">
                {teamStructure.offstageExecutives.map((exec, idx) => (
                  <MemberCard key={idx} member={exec} />
                ))}
              </div>
            </div>

            {/* Creative Heads & PR */}
            <div className="flex flex-col items-center">
              <div className="rounded-full border-2 border-yellow-400 bg-gray-900 px-3 sm:px-4 py-1.5 sm:py-2">
                <p className="font-[family-name:var(--font-vt)] text-xs sm:text-sm font-bold text-yellow-400">
                  CREATIVE TEAM
                </p>
              </div>
              <VerticalLineMobile height="h-6" />
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6">
                {teamStructure.creativeHeads.map((head, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="rounded-full border border-yellow-400 bg-gray-900 px-2 py-1 mb-2">
                      <p className="font-[family-name:var(--font-vt)] text-[8px] sm:text-[10px] font-bold text-yellow-400 text-center">
                        {head.role === 'Video'
                          ? 'VIDEO'
                          : head.role === 'Graphics'
                            ? 'GRAPHICS'
                            : 'PR'}
                      </p>
                    </div>
                    <MemberCard member={head} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}