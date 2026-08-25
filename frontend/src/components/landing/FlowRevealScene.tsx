'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Layers, ArrowRight, Sparkles, Brain, CheckSquare, Target, Zap } from 'lucide-react';

export const FlowRevealScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const nodeScale = useTransform(scrollYProgress, [0.08, 0.42], [0.85, 1.08]);
  const nodeOpacity = useTransform(scrollYProgress, [0.05, 0.28], [0, 1]);
  const stepsOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const stepsTranslate = useTransform(scrollYProgress, [0.3, 0.6], [35, 0]);

  const loopSteps = [
    { title: 'CAPTURE', desc: 'Natural thoughts & raw inputs', icon: Layers, color: 'text-rose-500', step: '01' },
    { title: 'UNDERSTAND', desc: 'AI extracts semantics & duration', icon: Brain, color: 'text-amber-500', step: '02' },
    { title: 'FLOW', desc: 'Adaptive plan orchestration', icon: Sparkles, color: 'text-flow-accent', step: '03' },
    { title: 'ACTION', desc: 'Singular distraction-free focus', icon: Target, color: 'text-emerald-500', step: '04' },
  ];

  return (
    <section id="story" ref={containerRef} className="relative min-h-[190vh] w-full py-28 px-4">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center max-w-5xl mx-auto text-center">
        
        {/* Central FLOW Logo / Node */}
        <motion.div
          style={{ scale: nodeScale, opacity: nodeOpacity }}
          className="flex flex-col items-center mb-10"
        >
          <Logo size="xl" withText={false} animate={true} />
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-flow-text-primary tracking-tight mt-6">
            Meet <span className="text-flow-accent">FLOW.</span>
          </h2>

          <p className="text-base sm:text-xl text-flow-text-secondary mt-4 max-w-xl mx-auto leading-relaxed font-medium">
            An AI productivity companion that turns scattered commitments into a plan you can actually follow.
          </p>
        </motion.div>

        {/* Visual Metaphor Conversion Pipeline */}
        <motion.div
          style={{ opacity: stepsOpacity, y: stepsTranslate }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {loopSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="neu-card p-5 sm:p-6 flex flex-col items-center text-center relative group border border-flow-border/80 shadow-xl hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl neu-raised flex items-center justify-center mb-3">
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>

                  <span className="text-[10px] font-black text-flow-muted tracking-widest uppercase mb-1">
                    Step {step.step}
                  </span>

                  <span className="text-xs font-black uppercase tracking-wider text-flow-text-primary">
                    {step.title}
                  </span>

                  <span className="text-[11px] text-flow-secondary mt-1 font-medium leading-normal">
                    {step.desc}
                  </span>

                  {idx < loopSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-7 h-7 rounded-full neu-raised flex items-center justify-center text-flow-accent shadow-md">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full neu-pressed text-[11px] font-bold uppercase tracking-widest text-flow-muted">
            <Zap className="w-3 h-3 text-flow-accent" />
            <span>Continuous Autonomous Execution Loop</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
