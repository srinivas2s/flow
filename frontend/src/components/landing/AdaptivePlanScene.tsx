'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, RefreshCw, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  duration: string;
  type: 'project' | 'break' | 'task' | 'meeting';
  status: 'normal' | 'missed' | 'shifted' | 'fixed';
}

export const AdaptivePlanScene: React.FC = () => {
  const [isDisrupted, setIsDisrupted] = useState(false);

  const initialPlan: TimelineItem[] = [
    { id: '1', time: '03:00 PM', title: 'System Architecture Diagram', duration: '50m', type: 'project', status: 'normal' },
    { id: '2', time: '04:00 PM', title: 'Mindful Break & Walk', duration: '20m', type: 'break', status: 'normal' },
    { id: '3', time: '04:30 PM', title: 'Finish DBMS Normalization', duration: '45m', type: 'task', status: 'normal' },
    { id: '4', time: '06:00 PM', title: 'Team Sync & Demo', duration: '30m', type: 'meeting', status: 'fixed' },
  ];

  const adaptedPlan: TimelineItem[] = [
    { id: '1', time: '03:00 PM', title: 'System Architecture Diagram', duration: 'Overran +40m', type: 'project', status: 'missed' },
    { id: '3', time: '04:45 PM', title: 'Finish DBMS Normalization', duration: 'Shifted (35m sprint)', type: 'task', status: 'shifted' },
    { id: '2', time: '05:30 PM', title: 'Quick Micro-Break', duration: '15m buffer', type: 'break', status: 'shifted' },
    { id: '4', time: '06:00 PM', title: 'Team Sync & Demo', duration: 'Fixed slot', type: 'meeting', status: 'fixed' },
  ];

  const currentPlan = isDisrupted ? adaptedPlan : initialPlan;

  return (
    <section className="relative min-h-screen w-full py-24 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-flow-accent mb-3 block">
          Adaptive Resilience
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-flow-text-primary tracking-tight">
          Plans change. <span className="text-flow-accent">FLOW adapts.</span>
        </h2>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-3 max-w-lg mx-auto">
          Life is unpredictable. When meetings run long or tasks take more time, FLOW recalculates the remaining timeline without guilt or friction.
        </p>
      </div>

      {/* Disruption Controller */}
      <div className="max-w-md mx-auto w-full mb-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant={isDisrupted ? 'neu' : 'primary'}
          size="sm"
          onClick={() => setIsDisrupted(false)}
          className="w-full sm:w-auto"
        >
          <span>Normal Schedule</span>
        </Button>

        <Button
          variant={isDisrupted ? 'danger' : 'secondary'}
          size="sm"
          onClick={() => setIsDisrupted(true)}
          className="w-full sm:w-auto gap-2"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Simulate Unexpected Delay</span>
        </Button>
      </div>

      {/* Adaptive Message Notification */}
      <AnimatePresence>
        {isDisrupted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto w-full mb-6 p-3.5 rounded-2xl bg-flow-accent/10 border border-flow-accent/30 flex items-center gap-3 text-xs"
          >
            <div className="w-7 h-7 rounded-full neu-raised flex items-center justify-center text-flow-accent shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-flow-text-primary">
              <span className="font-bold">“I adjusted your plan.”</span>
              <p className="text-flow-text-secondary text-[11px] mt-0.5">
                Architecture ran long. Shifted DBMS into a focused 35m block before your 6 PM meeting.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Card */}
      <div className="max-w-md mx-auto w-full neu-card p-6 border border-flow-border/50">
        <div className="flex items-center justify-between pb-4 border-b border-flow-border/50 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-flow-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-flow-text-primary">
              Today&apos;s Adaptive Timeline
            </span>
          </div>
          <Badge variant={isDisrupted ? 'warning' : 'neutral'} size="sm">
            {isDisrupted ? 'Auto-Rebalanced' : 'On Track'}
          </Badge>
        </div>

        <div className="space-y-3 relative">
          {/* Vertical line indicator */}
          <div className="absolute left-16 top-3 bottom-3 w-0.5 bg-flow-border/60" />

          {currentPlan.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              className={`relative flex items-center gap-4 p-3 rounded-2xl transition-all ${
                item.status === 'shifted'
                  ? 'neu-pressed border border-flow-accent/40 bg-flow-accent/5'
                  : item.status === 'missed'
                  ? 'neu-pressed opacity-70 border border-amber-500/30'
                  : 'neu-raised'
              }`}
            >
              <div className="w-12 text-right shrink-0">
                <span className="text-[11px] font-bold text-flow-text-primary tracking-tight">
                  {item.time}
                </span>
              </div>

              {/* Node dot */}
              <div className="relative z-10 w-3 h-3 rounded-full bg-flow-surface border-2 border-flow-accent shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-flow-text-primary truncate">
                  {item.title}
                </p>
                <span className="text-[10px] text-flow-muted">
                  {item.duration}
                </span>
              </div>

              {item.status === 'shifted' && (
                <Badge variant="accent" size="sm" className="shrink-0 text-[10px]">
                  Adapted
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};
