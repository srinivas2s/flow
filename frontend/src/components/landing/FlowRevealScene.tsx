'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Layers, ArrowDown, Sparkles, Brain, CheckSquare, Target } from 'lucide-react';

export const FlowRevealScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const nodeScale = useTransform(scrollYProgress, [0.1, 0.45], [0.8, 1.1]);
  const nodeOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const stepsOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const stepsTranslate = useTransform(scrollYProgress, [0.35, 0.65], [30, 0]);

  const loopSteps = [
    { title: 'CHAOS', desc: 'Raw thoughts & inputs', icon: Layers, color: 'text-rose-500' },
    { title: 'UNDERSTAND', desc: 'AI extracts semantics', icon: Brain, color: 'text-amber-500' },
    { title: 'FLOW', desc: 'Adaptive orchestration', icon: Sparkles, color: 'text-flow-accent' },
    { title: 'ACTION', desc: 'Singular focus session', icon: Target, color: 'text-emerald-500' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[180vh] w-full py-24 px-4">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center max-w-5xl mx-auto text-center">
        
        {/* Central FLOW Logo / Node */}
        <motion.div
          style={{ scale: nodeScale, opacity: nodeOpacity }}
          className="flex flex-col items-center mb-8"
        >
          <Logo size="xl" withText={false} animate={true} />
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-flow-text-primary tracking-tight mt-6"
          >
            Meet <span className="text-flow-accent">FLOW.</span>
          </motion.h2>

          <p className="text-base sm:text-xl text-flow-text-secondary mt-4 max-w-xl mx-auto leading-relaxed">
            An AI productivity companion that turns scattered commitments into a plan you can actually follow.
          </p>
        </motion.div>

        {/* Visual Metaphor: Chaos -> Understand -> Flow -> Action */}
        <motion.div
          style={{ opacity: stepsOpacity, y: stepsTranslate }}
          className="w-full max-w-4xl mx-auto mt-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {loopSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="neu-card p-4 sm:p-5 flex flex-col items-center text-center relative group"
                >
                  <div className="w-10 h-10 rounded-2xl neu-raised flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-flow-text-primary">
                    {step.title}
                  </span>
                  <span className="text-[11px] text-flow-muted mt-1">
                    {step.desc}
                  </span>

                  {idx < loopSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full neu-raised flex items-center justify-center text-flow-muted">
                        <ArrowDown className="w-3 h-3 -rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-xs font-semibold uppercase tracking-widest text-flow-muted">
            Continuous Adaptive Loop
          </div>
        </motion.div>

      </div>
    </section>
  );
};
