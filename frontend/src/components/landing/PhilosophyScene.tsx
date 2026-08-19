'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const PhilosophyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.6], [0, 1, 0.4]);
  const line2Opacity = useTransform(scrollYProgress, [0.4, 0.7, 0.95], [0, 1, 1]);
  const line2Scale = useTransform(scrollYProgress, [0.4, 0.7], [0.95, 1]);

  return (
    <section ref={containerRef} className="relative h-[180vh] w-full px-4">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        
        {/* First Statement */}
        <motion.p
          style={{ opacity: line1Opacity }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-flow-muted tracking-tight max-w-3xl leading-snug mb-8"
        >
          FLOW doesn&apos;t give you more things to manage.
        </motion.p>

        {/* The Core Philosophy Punchline */}
        <motion.h2
          style={{ opacity: line2Opacity, scale: line2Scale }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-flow-text-primary tracking-tight max-w-3xl leading-tight"
        >
          It gives you <span className="text-flow-accent underline decoration-flow-accent/40 underline-offset-8">fewer things to think about.</span>
        </motion.h2>

      </div>
    </section>
  );
};
