'use client';

import React from 'react';
import { ScrollyCanvas } from './ScrollyCanvas';
import { Projects } from './Projects';

export default function HomePage() {
  return (
    <main className="bg-[#06080C] text-[#F1EFEA] min-h-screen">
      {/* 500vh Cinematic Canvas Scroller with Parallax Overlays */}
      <ScrollyCanvas totalFrames={120} sequencePath="/sequence/frame_" />

      {/* Modern Work Grid / Project Case Studies */}
      <Projects />

      {/* About Section with High-Res Studio Portrait */}
      <section id="about" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#C6A77B]/20">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 rounded-3xl overflow-hidden border border-[#C6A77B]/30 shadow-2xl">
            <img
              src="/images/portrait.png"
              alt="Kelvin Jackson Chezieuche"
              className="w-full h-[500px] object-cover object-top"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono text-[#C6A77B] uppercase tracking-widest block">
              A Little About Me
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4">
              Behind every successful interaction is someone who{' '}
              <span className="text-[#C6A77B] font-normal">cares about the details.</span>
            </h2>
            <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">
              I'm Kelvin Jackson Chezieuche, a customer service and administrative professional based in Lagos, Nigeria.
              My professional experience has given me exposure to customer engagement, client relations, front desk operations, lead generation and administrative support.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
