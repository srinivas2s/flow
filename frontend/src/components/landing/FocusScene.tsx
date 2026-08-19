'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Pause, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const FocusScene: React.FC = () => {
  const [seconds, setSeconds] = useState(1961); // 32:41
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = 2100; // 35 min
  const progressPercent = ((totalDuration - seconds) / totalDuration) * 100;

  return (
    <section className="relative min-h-screen w-full py-24 px-4 flex flex-col items-center justify-center">
      
      {/* Calm ambient background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[600px] h-[600px] rounded-full bg-flow-accent/10 blur-[130px]" />
      </div>

      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-flow-accent mb-3 block">
          Distraction-Free Execution
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-flow-text-primary tracking-tight">
          Less deciding. <span className="text-flow-accent">More doing.</span>
        </h2>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-3">
          When you start a session, everything else disappears. Your only job is the single next step.
        </p>
      </div>

      {/* Focus Interface Demo Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-md neu-card p-6 sm:p-8 border border-flow-border/50 flex flex-col items-center text-center relative"
      >
        <div className="w-full flex items-center justify-between pb-4 border-b border-flow-border/40 mb-6">
          <Badge variant="accent" size="sm">
            Focus Mode Active
          </Badge>
          <span className="text-xs text-flow-muted">Step 1 of 3</span>
        </div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-flow-muted mb-1">
          DBMS ASSIGNMENT
        </span>
        <h3 className="text-lg font-bold text-flow-text-primary tracking-tight mb-6">
          Research Normalization (3NF & BCNF)
        </h3>

        {/* Circular Progress Timer */}
        <div className="my-3">
          <ProgressRing progress={progressPercent} size={170} strokeWidth={9}>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black tracking-tighter text-flow-text-primary font-mono">
                {formatTime(seconds)}
              </span>
              <span className="text-[10px] uppercase font-bold text-flow-muted tracking-widest mt-1">
                Remaining
              </span>
            </div>
          </ProgressRing>
        </div>

        {/* Sub-step indicator */}
        <div className="w-full mt-6 p-3 rounded-2xl neu-pressed text-left flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-flow-accent shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-flow-text-primary">Current Milestone:</span>
            <p className="text-flow-text-secondary mt-0.5">
              Draft relational schema diagrams and 3NF functional dependencies.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full flex gap-3 mt-6">
          <Button
            variant={isActive ? 'secondary' : 'primary'}
            size="md"
            className="flex-1 gap-1.5 text-xs font-semibold"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </>
            )}
          </Button>

          <Button
            variant="neu"
            size="md"
            className="flex-1 gap-1.5 text-xs font-semibold hover:text-emerald-500"
            onClick={() => setSeconds(0)}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete</span>
          </Button>
        </div>
      </motion.div>

    </section>
  );
};
