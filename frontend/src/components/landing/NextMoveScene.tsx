'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Sparkles, Clock, Calendar, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const NextMoveScene: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-24 px-4 flex flex-col items-center justify-center">
      
      {/* Glow highlight */}
      <div className="absolute w-72 h-72 rounded-full bg-flow-accent/10 blur-[90px] pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-flow-accent mb-3 block">
          Core Product Experience
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-flow-text-primary tracking-tight">
          One question. One answer.
        </h2>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-3">
          FLOW calculates your deadlines, available slot duration, and current cognitive energy to serve your immediate next step.
        </p>
      </div>

      {/* The Central Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md neu-card p-6 sm:p-8 border border-flow-border/60 relative overflow-hidden"
      >
        {/* Accent top gradient stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-flow-accent via-indigo-400 to-flow-accent" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-extrabold tracking-widest text-flow-accent uppercase">
              Your Next Move
            </span>
          </div>
          <Badge variant="accent" size="sm">
            High Priority
          </Badge>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-flow-text-primary tracking-tight mb-4">
          Finish DBMS introduction
        </h3>

        {/* Task Metadata Pills */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-medium">
            <Calendar className="w-3.5 h-3.5 text-flow-accent" />
            <span>Due tomorrow, 5:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-medium">
            <Clock className="w-3.5 h-3.5 text-flow-accent" />
            <span>35 min sprint</span>
          </div>
        </div>

        {/* Why Now Reason Box */}
        <div className="p-4 rounded-2xl neu-pressed mb-6 border border-flow-border/40">
          <div className="flex items-center gap-1.5 text-xs font-bold text-flow-text-primary mb-1">
            <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
            <span>Why now?</span>
          </div>
          <p className="text-xs text-flow-text-secondary leading-relaxed">
            You have <strong>45 min available</strong> before your 6:00 PM team sync. Completing this closes your highest-stress deadline today.
          </p>
        </div>

        {/* CTA Launch Focus Mode */}
        <Link href="/app?action=focus" className="block w-full">
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2 text-sm sm:text-base font-bold shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Focus Session</span>
          </Button>
        </Link>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-flow-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Zero context switching • Instant flow state</span>
        </div>
      </motion.div>

    </section>
  );
};
