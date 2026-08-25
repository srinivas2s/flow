'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Sparkles, Zap, Layers, Play, Calendar, Clock, CheckCircle2, ShieldCheck, Target } from 'lucide-react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  const [demoState, setDemoState] = useState<'flow' | 'chaos'>('flow');

  const chaosFragments = [
    { text: 'DBMS Normalization due Friday', time: '5:00 PM', color: 'border-amber-500/40 text-amber-500' },
    { text: 'Sync meeting with Frontend team', time: '6:00 PM', color: 'border-blue-500/40 text-blue-500' },
    { text: 'Reply to client proposal email', time: 'Urgent', color: 'border-rose-500/40 text-rose-500' },
    { text: 'Hackathon presentation slide deck', time: '30 min', color: 'border-purple-500/40 text-purple-500' },
    { text: 'Study React 19 server actions', time: 'Backlog', color: 'border-emerald-500/40 text-emerald-500' },
  ];

  return (
    <section className="relative min-h-[92vh] w-full pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[650px] h-[650px] rounded-full bg-flow-accent/15 blur-[150px] ambient-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Cognitive Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-pill text-xs font-bold text-flow-accent mb-6 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Adaptive Productivity Companion</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-flow-text-primary tracking-tight leading-[1.06] mb-6"
        >
          Stop planning. <br className="hidden sm:inline" />
          <span className="text-flow-accent">Start executing.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl md:text-2xl text-flow-text-secondary font-medium max-w-2xl mx-auto leading-relaxed mb-8"
        >
          FLOW turns your scattered tasks, meetings, and deadlines into a single adaptive plan and answers: <strong>“What should I do right now?”</strong>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center mb-14"
        >
          <Link href="/app" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 gap-2.5 text-base font-bold shadow-2xl group"
            >
              <span>Enter FLOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <a href="#story" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-6 text-sm font-semibold"
            >
              <span>Explore The Narrative</span>
            </Button>
          </a>
        </motion.div>

        {/* Live Interactive Hero Machine Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-2xl neu-card p-6 sm:p-8 border border-flow-border/80 shadow-2xl relative"
        >
          {/* Header Switcher */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-flow-border/60">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-flow-accent" />
              <span className="text-xs font-black uppercase tracking-wider text-flow-text-primary">
                Live State Comparator
              </span>
            </div>

            {/* Tactile state switch pill */}
            <div className="flex items-center p-1 rounded-xl neu-pressed">
              <button
                onClick={() => setDemoState('flow')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  demoState === 'flow'
                    ? 'neu-raised text-flow-accent shadow-sm'
                    : 'text-flow-text-secondary hover:text-flow-text-primary'
                }`}
              >
                FLOW State
              </button>
              <button
                onClick={() => setDemoState('chaos')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  demoState === 'chaos'
                    ? 'neu-raised text-rose-500 shadow-sm'
                    : 'text-flow-text-secondary hover:text-flow-text-primary'
                }`}
              >
                Mental Chaos
              </button>
            </div>
          </div>

          {/* Dynamic Content View */}
          <AnimatePresence mode="wait">
            {demoState === 'flow' ? (
              <motion.div
                key="flow-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4 text-left"
              >
                <div className="p-4 rounded-2xl neu-pressed border border-flow-accent/40 bg-flow-accent/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-flow-accent">
                        Immediate Next Action
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-flow-text-primary">
                      Finish DBMS Normalization assignment
                    </h3>
                    <p className="text-xs text-flow-text-secondary mt-0.5">
                      Estimated: 35 min • Available slot before 6:00 PM team sync
                    </p>
                  </div>

                  <Link href="/app?action=focus" className="shrink-0">
                    <Button variant="primary" size="sm" className="w-full sm:w-auto font-bold gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Focus</span>
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between text-xs text-flow-muted px-1">
                  <span>Downstream commitments: 3 auto-balanced</span>
                  <span>Cognitive friction: 0%</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chaos-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left"
              >
                {chaosFragments.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl neu-flat border ${item.color} flex items-center justify-between text-xs font-semibold`}
                  >
                    <span className="truncate pr-2 text-flow-text-primary">{item.text}</span>
                    <span className="text-[10px] opacity-75 shrink-0">{item.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
