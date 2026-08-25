'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Sparkles, Clock, Calendar, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export const NextMoveScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reason' | 'context'>('reason');

  return (
    <section className="relative min-h-screen w-full py-28 px-4 flex flex-col items-center justify-center">
      
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 rounded-full bg-flow-accent/15 blur-[120px] pointer-events-none ambient-pulse" />

      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-pill text-xs font-bold text-flow-accent mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Core Decision Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-flow-text-primary tracking-tight">
          One decision. Zero fatigue.
        </h2>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-3 font-medium">
          FLOW eliminates the agonizing choice of what to start. It weighs deadlines, available calendar space, and cognitive energy to serve your optimal step.
        </p>
      </div>

      {/* The Central Modern Neumorphic Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg neu-card p-6 sm:p-9 border border-flow-border/80 relative overflow-hidden shadow-2xl"
      >
        {/* Accent top gradient stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-flow-accent via-indigo-400 to-flow-accent" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-widest text-flow-accent uppercase">
              Your Next Move
            </span>
          </div>
          <Badge variant="accent" size="sm">
            High Priority
          </Badge>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight mb-4">
          Finish DBMS introduction
        </h3>

        {/* Task Metadata Pills */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-semibold">
            <Calendar className="w-3.5 h-3.5 text-flow-accent" />
            <span>Due tomorrow, 5:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-semibold">
            <Clock className="w-3.5 h-3.5 text-flow-accent" />
            <span>35 min sprint</span>
          </div>
        </div>

        {/* Dynamic Why Now Box */}
        <div className="p-4 rounded-2xl neu-pressed mb-6 border border-flow-border/40 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-flow-text-primary">
              <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
              <span>Why this task, right now?</span>
            </div>
            <span className="text-[10px] font-bold text-flow-accent uppercase tracking-wider">
              Optimal Match
            </span>
          </div>
          <p className="text-xs sm:text-sm text-flow-text-secondary leading-relaxed font-medium">
            You have <strong>45 min available</strong> before your 6:00 PM team sync. Completing this closes your highest-stress deadline today.
          </p>
        </div>

        {/* Launch Focus CTA */}
        <Link href="/app?action=focus" className="block w-full">
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2.5 text-sm sm:text-base font-bold shadow-xl group"
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>Start Focus Session</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-flow-muted font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Zero context switching • Instant deep focus state</span>
        </div>
      </motion.div>

    </section>
  );
};
