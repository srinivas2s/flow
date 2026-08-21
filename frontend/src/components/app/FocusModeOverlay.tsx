'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/types';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Pause, CheckCircle2, X, Sparkles, ArrowRight, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FocusModeOverlayProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onCompleteTask: (taskId: string) => void;
}

export const FocusModeOverlay: React.FC<FocusModeOverlayProps> = ({
  isOpen,
  task,
  onClose,
  onCompleteTask,
}) => {
  const initialSeconds = (task?.estimated_minutes || 35) * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setSeconds((task.estimated_minutes || 35) * 60);
      setIsActive(true);
      setIsCompleted(false);
    }
  }, [task]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isActive && seconds > 0 && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && !isCompleted && isOpen) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isOpen, isActive, seconds, isCompleted]);

  const handleComplete = () => {
    setIsCompleted(true);
    setIsActive(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5B5CE2', '#7C7DFF', '#10B981', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }

    if (task) {
      onCompleteTask(task.id);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = (task?.estimated_minutes || 35) * 60;
  const progressPercent = totalDuration > 0 ? ((totalDuration - seconds) / totalDuration) * 100 : 0;

  if (!isOpen || !task) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-flow-bg text-flow-text-primary flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
      >
        {/* Ambient focus backdrop glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-[650px] h-[650px] rounded-full bg-flow-accent/15 blur-[140px]" />
        </div>

        {/* Top bar */}
        <div className="relative z-10 max-w-xl mx-auto w-full flex items-center justify-between">
          <Badge variant="accent" size="md">
            Focus Mode Active
          </Badge>

          <button
            onClick={onClose}
            aria-label="Exit focus mode"
            className="p-2.5 rounded-full neu-button text-flow-muted hover:text-flow-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Focus Content */}
        <div className="relative z-10 max-w-md mx-auto w-full flex flex-col items-center text-center my-auto py-8">
          {!isCompleted ? (
            <>
              {/* Task Details */}
              <span className="text-xs font-extrabold uppercase tracking-widest text-flow-muted mb-2">
                {task.category || 'Deep Focus'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-flow-text-primary tracking-tight max-w-sm mb-8">
                {task.title}
              </h2>

              {/* Countdown Circular Timer */}
              <div className="my-4">
                <ProgressRing progress={progressPercent} size={220} strokeWidth={10}>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-flow-text-primary">
                      {formatTime(seconds)}
                    </span>
                    <span className="text-xs uppercase font-bold text-flow-muted tracking-widest mt-1">
                      Remaining
                    </span>
                  </div>
                </ProgressRing>
              </div>

              {/* Active Step Box */}
              <div className="w-full mt-8 p-4 rounded-2xl neu-pressed text-left border border-flow-border/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-flow-muted">
                  Current Action Step
                </span>
                <p className="text-xs sm:text-sm font-semibold text-flow-text-primary mt-1">
                  {task.description || 'Focus on completing this single milestone without distraction.'}
                </p>
              </div>

              {/* Tactile Controls */}
              <div className="w-full flex gap-3 mt-8">
                <Button
                  variant={isActive ? 'secondary' : 'primary'}
                  size="lg"
                  className="flex-1 font-bold gap-2 text-sm"
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Resume</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="neu"
                  size="lg"
                  className="flex-1 font-bold gap-2 text-sm hover:text-emerald-500"
                  onClick={handleComplete}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete</span>
                </Button>
              </div>
            </>
          ) : (
            /* Completed Celebration Screen */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="neu-card p-8 text-center max-w-sm w-full border border-emerald-500/30"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center neu-raised mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                Well Done
              </span>
              <h2 className="text-2xl font-black text-flow-text-primary tracking-tight mt-1 mb-2">
                Task Complete!
              </h2>

              <p className="text-xs sm:text-sm text-flow-text-secondary mb-6">
                <strong>{task.title}</strong> is finished. I&apos;ve logged your focus sprint and updated your daily plan.
              </p>

              <Button
                variant="primary"
                size="md"
                className="w-full font-bold gap-2"
                onClick={onClose}
              >
                <span>Return to Flow</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Bottom subtle assurance */}
        <div className="relative z-10 max-w-xl mx-auto w-full text-center text-xs text-flow-muted">
          <span>Less deciding • More doing • Flow state secured</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
