'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, RefreshCw, AlertCircle, CheckCircle2, ArrowRight, Sparkles, Sliders, Calendar, Zap } from 'lucide-react';

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  duration: string;
  type: 'project' | 'break' | 'task' | 'meeting';
  status: 'normal' | 'missed' | 'shifted' | 'fixed';
}

export const AdaptivePlanScene: React.FC = () => {
  const [scenario, setScenario] = useState<'normal' | 'delayed' | 'overrun'>('normal');

  const plans: Record<string, TimelineItem[]> = {
    normal: [
      { id: '1', time: '03:00 PM', title: 'System Architecture Design', duration: '50m sprint', type: 'project', status: 'normal' },
      { id: '2', time: '04:00 PM', title: 'Mindful Break & Walk', duration: '20m buffer', type: 'break', status: 'normal' },
      { id: '3', time: '04:30 PM', title: 'Finish DBMS Normalization', duration: '45m focus', type: 'task', status: 'normal' },
      { id: '4', time: '06:00 PM', title: 'Engineering Team Sync', duration: 'Fixed slot', type: 'meeting', status: 'fixed' },
    ],
    delayed: [
      { id: '1', time: '03:00 PM', title: 'System Architecture Design', duration: 'Overran by +35m', type: 'project', status: 'missed' },
      { id: '3', time: '04:45 PM', title: 'Finish DBMS Normalization', duration: 'Compressed 35m sprint', type: 'task', status: 'shifted' },
      { id: '2', time: '05:30 PM', title: 'Quick Micro-Break', duration: '15m buffer', type: 'break', status: 'shifted' },
      { id: '4', time: '06:00 PM', title: 'Engineering Team Sync', duration: 'Fixed slot', type: 'meeting', status: 'fixed' },
    ],
    overrun: [
      { id: '1', time: '03:00 PM', title: 'System Architecture Design', duration: 'Extended +60m', type: 'project', status: 'missed' },
      { id: '3', time: '05:15 PM', title: 'Finish DBMS (Core Schema)', duration: 'Decomposed 30m block', type: 'task', status: 'shifted' },
      { id: '4', time: '06:00 PM', title: 'Engineering Team Sync', duration: 'Fixed slot', type: 'meeting', status: 'fixed' },
      { id: '2', time: '07:00 PM', title: 'Finish DBMS PDF Submission', duration: 'Post-sync evening block', type: 'task', status: 'shifted' },
    ],
  };

  const currentPlan = plans[scenario];

  return (
    <section id="adaptive" className="relative min-h-screen w-full py-28 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-pill text-xs font-bold text-flow-accent mb-3">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Real-Time Timeline Re-balancing</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-flow-text-primary tracking-tight">
          Plans change. <span className="text-flow-accent">FLOW adapts.</span>
        </h2>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-3 max-w-lg mx-auto font-medium">
          Life is messy. When a meeting runs long or work spills over, FLOW recalculates downstream tasks instantly without guilt or broken streaks.
        </p>
      </div>

      {/* Disruption Simulator Buttons */}
      <div className="max-w-xl mx-auto w-full mb-8 flex flex-wrap items-center justify-center gap-2.5">
        <button
          onClick={() => setScenario('normal')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            scenario === 'normal'
              ? 'neu-pressed text-flow-accent border border-flow-accent/40 bg-flow-accent/5'
              : 'neu-raised text-flow-text-secondary hover:text-flow-text-primary'
          }`}
        >
          Ideal Schedule
        </button>

        <button
          onClick={() => setScenario('delayed')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            scenario === 'delayed'
              ? 'neu-pressed text-amber-500 border border-amber-500/40 bg-amber-500/5'
              : 'neu-raised text-flow-text-secondary hover:text-flow-text-primary'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Simulate +35m Meeting Delay</span>
        </button>

        <button
          onClick={() => setScenario('overrun')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            scenario === 'overrun'
              ? 'neu-pressed text-rose-500 border border-rose-500/40 bg-rose-500/5'
              : 'neu-raised text-flow-text-secondary hover:text-flow-text-primary'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Simulate Emergency Overrun</span>
        </button>
      </div>

      {/* Adaptive Status Pill */}
      <AnimatePresence mode="wait">
        {scenario !== 'normal' && (
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-lg mx-auto w-full mb-6 p-4 rounded-2xl neu-pressed border border-flow-accent/30 flex items-center gap-3 text-xs"
          >
            <div className="w-8 h-8 rounded-full neu-raised flex items-center justify-center text-flow-accent shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-flow-text-primary">
              <span className="font-bold">“I adjusted your plan.”</span>
              <p className="text-flow-text-secondary text-[11px] mt-0.5 font-medium">
                {scenario === 'delayed'
                  ? 'Shifted DBMS to a tight 35m sprint before 6 PM and shortened recovery buffer.'
                  : 'Split DBMS into two focused segments (one pre-sync, one evening) to preserve 6 PM meeting.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Adaptive Visual Timeline Card */}
      <div className="max-w-lg mx-auto w-full neu-card p-6 sm:p-8 border border-flow-border/80 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-flow-border/60 mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-flow-accent" />
            <span className="text-xs font-black uppercase tracking-wider text-flow-text-primary">
              Adaptive Sequence
            </span>
          </div>
          <Badge variant={scenario === 'normal' ? 'neutral' : 'accent'} size="sm">
            {scenario === 'normal' ? 'On Track' : 'Auto-Balanced'}
          </Badge>
        </div>

        <div className="space-y-3 relative">
          {/* Vertical continuous guide */}
          <div className="absolute left-[70px] sm:left-[82px] top-3 bottom-3 w-0.5 bg-flow-border/80" />

          {currentPlan.map((item) => (
            <motion.div
              layout
              key={item.id + item.time}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className={`relative flex items-center gap-4 p-3.5 rounded-2xl transition-all ${
                item.status === 'shifted'
                  ? 'neu-pressed border border-flow-accent/40 bg-flow-accent/5'
                  : item.status === 'missed'
                  ? 'neu-pressed opacity-70 border border-amber-500/30'
                  : 'neu-raised'
              }`}
            >
              <div className="w-14 sm:w-16 text-right shrink-0">
                <span className="text-xs font-black text-flow-text-primary tracking-tight block">
                  {item.time.split(' ')[0]}
                </span>
                <span className="text-[10px] text-flow-muted">
                  {item.time.split(' ')[1]}
                </span>
              </div>

              {/* Node dot */}
              <div
                className={`relative z-10 w-3.5 h-3.5 rounded-full neu-raised border-2 shrink-0 ${
                  item.status === 'shifted'
                    ? 'border-flow-accent bg-flow-accent'
                    : item.status === 'missed'
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-flow-muted bg-flow-surface'
                }`}
              />

              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-flow-text-primary truncate">
                  {item.title}
                </p>
                <span className="text-[10px] text-flow-muted font-medium">
                  {item.duration}
                </span>
              </div>

              {item.status === 'shifted' && (
                <Badge variant="accent" size="sm" className="shrink-0 text-[10px]">
                  Shifted
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
