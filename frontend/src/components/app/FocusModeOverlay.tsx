'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/types';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Pause, CheckCircle2, X, Sparkles, ArrowRight, Shield, Volume2, VolumeX, Check, RotateCcw } from 'lucide-react';
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
  const [ambientSound, setAmbientSound] = useState<'alpha' | 'rain' | 'off'>('alpha');
  
  // Interactive sub-step checklist
  const [substeps, setSubsteps] = useState([
    { id: 1, text: 'Review normalization theory & functional dependencies', done: false },
    { id: 2, text: 'Draft 3NF & BCNF decomposed tables', done: false },
    { id: 3, text: 'Verify lossless join and dependency preservation', done: false },
  ]);

  useEffect(() => {
    if (task) {
      setSeconds((task.estimated_minutes || 35) * 60);
      setIsActive(true);
      setIsCompleted(false);
      setSubsteps([
        { id: 1, text: `Decompose requirements for ${task.title}`, done: false },
        { id: 2, text: 'Execute core technical solution and verify edge cases', done: false },
        { id: 3, text: 'Final polish and mark milestone complete', done: false },
      ]);
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

  const toggleSubstep = (id: number) => {
    setSubsteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setIsActive(false);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#6366F1', '#10B981', '#F59E0B'],
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
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-35">
          <div className="w-[700px] h-[700px] rounded-full bg-flow-accent/20 blur-[150px] ambient-pulse" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-10 max-w-xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="md">
              Focus Chamber
            </Badge>
            <button
              onClick={() => setAmbientSound((prev) => (prev === 'alpha' ? 'rain' : prev === 'rain' ? 'off' : 'alpha'))}
              className="px-3 py-1 rounded-full neu-button text-[11px] font-semibold text-flow-text-secondary flex items-center gap-1.5"
            >
              {ambientSound === 'off' ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-flow-accent" />}
              <span>{ambientSound === 'alpha' ? 'Alpha Waves (40Hz)' : ambientSound === 'rain' ? 'Rain Ambient' : 'Sound Muted'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Exit focus mode"
            className="p-2.5 rounded-full neu-button text-flow-muted hover:text-flow-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Focus Body */}
        <div className="relative z-10 max-w-md mx-auto w-full flex flex-col items-center text-center my-auto py-8">
          {!isCompleted ? (
            <>
              {/* Task Title */}
              <span className="text-xs font-extrabold uppercase tracking-widest text-flow-accent mb-2">
                {task.category || 'Deep Focus Sprint'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight max-w-sm mb-6">
                {task.title}
              </h2>

              {/* Countdown Progress Ring */}
              <div className="my-3">
                <ProgressRing progress={progressPercent} size={230} strokeWidth={11}>
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

              {/* Sub-step Milestones */}
              <div className="w-full mt-7 neu-card p-4 text-left border border-flow-border/60 space-y-2.5">
                <div className="flex items-center justify-between pb-1 border-b border-flow-border/40">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-flow-muted">
                    Execution Milestones
                  </span>
                  <span className="text-[10px] font-bold text-flow-accent">
                    {substeps.filter((s) => s.done).length} of {substeps.length}
                  </span>
                </div>

                {substeps.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubstep(sub.id)}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl neu-pressed text-left transition-all hover:border-flow-accent/40"
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        sub.done ? 'bg-emerald-500 text-white' : 'border border-flow-muted'
                      }`}
                    >
                      {sub.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        sub.done ? 'line-through text-flow-muted' : 'text-flow-text-primary'
                      }`}
                    >
                      {sub.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="w-full flex gap-3 mt-7">
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
            /* Completed Screen */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="neu-card p-8 text-center max-w-sm w-full border border-emerald-500/40 shadow-2xl"
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

              <p className="text-xs sm:text-sm text-flow-text-secondary mb-6 leading-relaxed font-medium">
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

        {/* Footer */}
        <div className="relative z-10 max-w-xl mx-auto w-full text-center text-xs text-flow-muted font-medium">
          <span>Less deciding • More doing • Flow state secured</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
