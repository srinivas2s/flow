'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  GraduationCap, 
  Rocket, 
  Code2, 
  Flame, 
  HeartHandshake, 
  Sliders, 
  Sparkles, 
  Check, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BalanceArchetype {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  icon: any;
  sprintDuration: number;
  bufferSize: string;
  focusRatio: string;
  color: string;
  accentBadge: string;
}

interface BalanceModeViewProps {
  onApplyBalanceFlow: (selectedModes: string[]) => void;
}

export const BalanceModeView: React.FC<BalanceModeViewProps> = ({ onApplyBalanceFlow }) => {
  const archetypes: BalanceArchetype[] = [
    {
      id: 'academic',
      name: 'Academic Balance',
      tagline: 'Coursework, Exam Prep & Spaced Retention',
      desc: 'Optimizes for steady 35-minute study sprints, active recall breaks, syllabus milestone pacing, and zero exam cramming.',
      icon: GraduationCap,
      sprintDuration: 35,
      bufferSize: '20 min buffers',
      focusRatio: '60% Study / 40% Review & Rest',
      color: 'border-blue-500/40 text-blue-500',
      accentBadge: 'Academic',
    },
    {
      id: 'startup',
      name: 'Startup & Founder Balance',
      tagline: 'High-Velocity Shipping & Customer Syncs',
      desc: 'Blends rapid 25-minute execution blitzes with flexible buffers for ad-hoc customer calls, PR reviews, and investor syncs.',
      icon: Rocket,
      sprintDuration: 25,
      bufferSize: '10 min agile slots',
      focusRatio: '70% Shipping / 30% Outreach',
      color: 'border-purple-500/40 text-purple-500',
      accentBadge: 'Founder Mode',
    },
    {
      id: 'engineering',
      name: 'Engineering Deep Work',
      tagline: 'Unbroken Flow & Zero-Distraction Coding',
      desc: 'Schedules 60–90 minute uninterrupted architecture and coding chambers. Aggressively clusters meetings into a single afternoon window.',
      icon: Code2,
      sprintDuration: 60,
      bufferSize: '30 min decompression',
      focusRatio: '85% Deep Coding / 15% Commits',
      color: 'border-emerald-500/40 text-emerald-500',
      accentBadge: 'Deep Work',
    },
    {
      id: 'crunch',
      name: 'Exam & Launch Crunch',
      tagline: 'High-Urgency Prioritization & Blocker Removal',
      desc: 'Compresses non-essential tasks, prioritizes immediate deadlines due in < 48 hours, and maximizes pure execution throughput.',
      icon: Flame,
      sprintDuration: 45,
      bufferSize: '5 min rapid pauses',
      focusRatio: '90% Execution / 10% Triage',
      color: 'border-rose-500/40 text-rose-500',
      accentBadge: 'Urgent Sprint',
    },
    {
      id: 'holistic',
      name: 'Holistic & Life Balance',
      tagline: 'Sustainable Output & Recovery Protection',
      desc: 'Enforces hard stops at 6:30 PM, schedules wellness and reflection windows, and prioritizes habit consistency over raw volume.',
      icon: HeartHandshake,
      sprintDuration: 40,
      bufferSize: '25 min recharge',
      focusRatio: '50% Work / 50% Recovery',
      color: 'border-amber-500/40 text-amber-500',
      accentBadge: 'Wellbeing',
    },
  ];

  const [selectedModeIds, setSelectedModeIds] = useState<string[]>(['academic', 'startup']);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const toggleMode = (id: string) => {
    setSelectedModeIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((m) => m !== id);
      } else {
        return [...prev, id];
      }
    });
    setHasApplied(false);
  };

  const handleSynthesizeFlow = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setHasApplied(true);
      onApplyBalanceFlow(selectedModeIds);
    }, 800);
  };

  const activeArchetypes = archetypes.filter((a) => selectedModeIds.includes(a.id));

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Cognitive Balance & Life Modes
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Select or combine lifestyle modes to dynamically rebalance your adaptive schedule
          </p>
        </div>

        <Badge variant="accent" size="sm">
          {selectedModeIds.length} Mode{selectedModeIds.length > 1 ? 's Combined' : ' Active'}
        </Badge>
      </div>

      {/* Mode Archetype Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {archetypes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedModeIds.includes(mode.id);

          return (
            <motion.div
              layout
              key={mode.id}
              onClick={() => toggleMode(mode.id)}
              className={`p-5 rounded-3xl cursor-pointer transition-all border ${
                isSelected
                  ? 'neu-pressed border-flow-accent/60 bg-flow-accent/5 shadow-inner'
                  : 'neu-card border-flow-border/80 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                      isSelected ? 'bg-flow-accent text-white' : 'neu-pressed text-flow-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-flow-text-primary leading-tight">
                      {mode.name}
                    </h3>
                    <span className="text-[10px] text-flow-accent font-bold uppercase tracking-wider">
                      {mode.accentBadge}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-flow-accent border-flow-accent text-white'
                      : 'border-flow-border neu-pressed text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              <p className="text-xs text-flow-text-secondary line-clamp-2 mb-3 font-medium leading-relaxed">
                {mode.desc}
              </p>

              <div className="flex items-center justify-between text-[10px] text-flow-muted font-bold pt-2.5 border-t border-flow-border/50">
                <span>{mode.sprintDuration}m Sprints</span>
                <span>{mode.bufferSize}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Combined Flow Synthesis Summary Card */}
      <div className="neu-card p-6 sm:p-7 border border-flow-border/80 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-flow-border/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-flow-accent" />
            <h2 className="text-sm font-black text-flow-text-primary">
              Synthesized Combined Flow Parameters
            </h2>
          </div>
          <span className="text-[10px] text-flow-muted font-bold uppercase">
            Real-time Adaptive Weights
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl neu-pressed text-left space-y-1">
            <span className="text-[10px] font-black uppercase text-flow-muted">Active Archetypes</span>
            <div className="flex flex-wrap gap-1 pt-1">
              {activeArchetypes.map((a) => (
                <span key={a.id} className="text-[11px] font-bold text-flow-text-primary px-2 py-0.5 rounded-lg neu-raised">
                  {a.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl neu-pressed text-left space-y-1">
            <span className="text-[10px] font-black uppercase text-flow-muted">Balanced Sprint Size</span>
            <p className="text-xs font-black text-flow-accent pt-1">
              {Math.round(
                activeArchetypes.reduce((acc, curr) => acc + curr.sprintDuration, 0) / activeArchetypes.length
              )} min calibrated sprints
            </p>
          </div>

          <div className="p-3.5 rounded-2xl neu-pressed text-left space-y-1">
            <span className="text-[10px] font-black uppercase text-flow-muted">Energy Distribution</span>
            <p className="text-xs font-black text-flow-text-primary pt-1">
              Dual Priority Balancing
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSynthesizeFlow}
            disabled={isSynthesizing}
            className="w-full gap-2 font-bold shadow-xl"
          >
            {isSynthesizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Re-calibrating Adaptive Sequence...</span>
              </>
            ) : hasApplied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Combined Flow Active & Applied!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Apply Combined Balance Flow to Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
