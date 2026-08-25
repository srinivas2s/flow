'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Layers, Sparkles, Brain, Target, ArrowRight, Zap, CheckCircle2, Clock, Calendar } from 'lucide-react';

export const FlowRevealScene: React.FC = () => {
  const storySteps = [
    {
      step: '01',
      title: 'CAPTURE',
      badge: 'Step 01 • Instant Ingestion',
      headline: 'Dump everything in your mind.',
      desc: 'No manual forms or tagging. Speak or type raw unstructured thoughts, emails, and deadlines in plain language.',
      icon: Layers,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      mockup: (
        <div className="p-4 rounded-2xl neu-pressed text-left space-y-2 border border-flow-border/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-flow-muted">Raw Stream Input</span>
          <p className="text-xs sm:text-sm font-medium text-flow-text-primary italic leading-relaxed">
            &ldquo;Need to finish the DBMS normalization assignment before Friday 5pm, plus sync with frontend team at 6pm.&rdquo;
          </p>
        </div>
      ),
    },
    {
      step: '02',
      title: 'UNDERSTAND',
      badge: 'Step 02 • Cognitive Semantic Parser',
      headline: 'FLOW breaks it down into reality.',
      desc: 'The AI extracts exact time requirements, urgency weights, cognitive energy profiles, and hard calendar constraints.',
      icon: Brain,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      mockup: (
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="p-3 rounded-xl neu-pressed">
            <span className="text-[10px] font-bold text-flow-muted block uppercase">Extracted Task</span>
            <span className="text-xs font-bold text-flow-text-primary block mt-0.5">DBMS Normalization</span>
          </div>
          <div className="p-3 rounded-xl neu-pressed">
            <span className="text-[10px] font-bold text-flow-muted block uppercase">Estimated Sprint</span>
            <span className="text-xs font-bold text-flow-text-primary block mt-0.5">35 Mins Focus</span>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'FLOW',
      badge: 'Step 03 • Adaptive Orchestration',
      headline: 'Your day sequenced automatically.',
      desc: 'FLOW finds the optimal calendar window that matches your peak cognitive energy before your next meeting.',
      icon: Sparkles,
      color: 'text-flow-accent',
      bgColor: 'bg-flow-accent/10',
      borderColor: 'border-flow-accent/30',
      mockup: (
        <div className="p-3.5 rounded-xl neu-pressed text-left space-y-1.5 border border-flow-accent/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-flow-accent uppercase tracking-wider">Scheduled Window</span>
            <span className="text-[10px] text-emerald-500 font-bold">Optimal Fit</span>
          </div>
          <div className="text-xs font-bold text-flow-text-primary">
            04:45 PM – 05:20 PM (35m Focus Box)
          </div>
          <span className="text-[11px] text-flow-text-secondary block">
            Positioned before 6:00 PM Team Sync with 40m recovery buffer.
          </span>
        </div>
      ),
    },
    {
      step: '04',
      title: 'ACTION',
      badge: 'Step 04 • Distraction-Free Execution',
      headline: 'One clear step. Total focus.',
      desc: 'No task lists to browse. FLOW serves your immediate next move with a dedicated focus chamber and zero context switching.',
      icon: Target,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      mockup: (
        <div className="p-4 rounded-2xl neu-raised text-left flex items-center justify-between border border-emerald-500/40 bg-emerald-500/5">
          <div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Focus Chamber Ready</span>
            <span className="text-xs sm:text-sm font-black text-flow-text-primary block mt-0.5">Finish DBMS Normalization</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center neu-raised shadow-md shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="story" className="relative w-full py-28 px-4 max-w-4xl mx-auto">
      {/* Narrative Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-flow-text-primary tracking-tight">
          The <span className="text-flow-accent">FLOW</span> Story.
        </h2>

        <p className="text-base sm:text-xl text-flow-text-secondary mt-4 max-w-xl mx-auto leading-relaxed font-medium">
          How raw mental chaos is converted into effortless execution across 4 continuous stages.
        </p>
      </motion.div>

      {/* Vertical Story Flow Sequence */}
      <div className="relative space-y-16">

        {storySteps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10"
            >
              {/* Step Number Icon Node */}
              <div className="relative z-10 w-16 h-16 rounded-3xl neu-card flex flex-col items-center justify-center shrink-0 border border-flow-border shadow-xl">
                <Icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-[10px] font-black text-flow-muted tracking-tighter mt-0.5">
                  {item.step}
                </span>
              </div>

              {/* Story Content Card */}
              <div className="flex-1 w-full neu-card p-6 sm:p-8 border border-flow-border/80 shadow-2xl hover:scale-[1.01] transition-transform">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-pressed text-[11px] font-bold uppercase tracking-wider text-flow-accent mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>{item.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight mb-2">
                  {item.headline}
                </h3>

                <p className="text-xs sm:text-sm text-flow-text-secondary font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Interactive Simulated Live Mockup */}
                <div>
                  {item.mockup}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Story Conclusion Badge */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neu-pressed text-xs font-bold uppercase tracking-widest text-flow-accent shadow-inner">
          <Zap className="w-4 h-4" />
          <span>Continuous Adaptive Cycle • Runs Autonomously</span>
        </div>
      </div>
    </section>
  );
};
