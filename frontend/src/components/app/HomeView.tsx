'use client';

import React from 'react';
import { Task, PlanItem, AIRecommendation } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Sparkles, Clock, Calendar, CheckCircle2, ArrowRight, Layers, Flame, TrendingUp, Zap, Plus, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeViewProps {
  tasks: Task[];
  plan: PlanItem[];
  recommendation: AIRecommendation | null;
  onStartFocus: (task: Task) => void;
  onNavigateTab: (tab: 'home' | 'tasks' | 'plan' | 'brain') => void;
  onOpenAI: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tasks,
  plan,
  recommendation,
  onStartFocus,
  onNavigateTab,
  onOpenAI,
}) => {
  const completedTasksCount = tasks.filter((t) => t.status === 'completed').length;
  const totalTasksCount = tasks.length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const nextMoveTask = recommendation?.task || tasks[0];

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Top Greeting & Cognitive State */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Today&apos;s Focus
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary mt-0.5 font-medium">
            {completedTasksCount} of {totalTasksCount} commitments fulfilled
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm" icon={<Zap className="w-3.5 h-3.5 text-flow-accent" />}>
            Peak Energy Window
          </Badge>
        </div>
      </div>

      {/* Hero Recommendation Card: "YOUR NEXT MOVE" */}
      {nextMoveTask && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neu-card p-6 sm:p-8 border border-flow-border/80 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle accent top line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-flow-accent via-indigo-400 to-flow-accent" />

          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold tracking-widest text-flow-accent uppercase">
                Your Next Move
              </span>
            </div>
            <Badge variant="danger" size="sm">
              {nextMoveTask.priority.toUpperCase()} PRIORITY
            </Badge>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight mb-3">
            {nextMoveTask.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-semibold">
              <Calendar className="w-3.5 h-3.5 text-flow-accent" />
              <span>{nextMoveTask.deadline || 'Today'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-semibold">
              <Clock className="w-3.5 h-3.5 text-flow-accent" />
              <span>{nextMoveTask.estimated_minutes} min duration</span>
            </div>
          </div>

          {/* Why Now Reason Box */}
          <div className="p-4 rounded-2xl neu-pressed mb-5 border border-flow-border/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-flow-text-primary mb-1">
              <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
              <span>Why now?</span>
            </div>
            <p className="text-xs sm:text-sm text-flow-text-secondary leading-relaxed font-medium">
              {recommendation?.reason ||
                `You have an optimal 45m work window before your 6:00 PM sync. Completing this keeps your daily momentum high.`}
            </p>
          </div>

          {/* Start Focus Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2.5 font-bold shadow-lg text-sm sm:text-base group"
            onClick={() => onStartFocus(nextMoveTask)}
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>Launch Focus Session</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      )}

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={onOpenAI}
          className="neu-card p-4 text-left transition-all hover:scale-[1.02] flex items-center gap-3 border border-flow-border/80"
        >
          <div className="w-10 h-10 rounded-2xl neu-raised flex items-center justify-center text-flow-accent shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-flow-text-primary block">Ask FLOW AI</span>
            <span className="text-[10px] text-flow-muted">Natural language reasoning</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('tasks')}
          className="neu-card p-4 text-left transition-all hover:scale-[1.02] flex items-center gap-3 border border-flow-border/80"
        >
          <div className="w-10 h-10 rounded-2xl neu-raised flex items-center justify-center text-emerald-500 shrink-0">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-flow-text-primary block">Capture Task</span>
            <span className="text-[10px] text-flow-muted">Quick add to backlog</span>
          </div>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="neu-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-flow-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Plan Adherence</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-flow-text-primary">{progressPercent}%</span>
            <span className="text-xs text-flow-muted font-medium">on schedule</span>
          </div>
        </div>

        <div className="neu-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-flow-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Available Block</span>
            <Clock className="w-4 h-4 text-flow-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-flow-text-primary">45m</span>
            <span className="text-xs text-flow-muted font-medium">before 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Today's Sequence Quick View */}
      <div className="neu-card p-6">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-flow-border/60">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-flow-accent" />
            <h3 className="text-xs font-bold text-flow-text-primary uppercase tracking-wider">
              Today&apos;s Sequence
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('plan')}
            className="text-xs font-bold text-flow-accent hover:underline flex items-center gap-1"
          >
            <span>View Full Plan</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {plan.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                item.status === 'active'
                  ? 'neu-pressed border border-flow-accent/40 bg-flow-accent/5'
                  : item.status === 'completed'
                  ? 'opacity-60 neu-flat'
                  : 'neu-flat'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-black text-flow-text-primary w-16 shrink-0">
                  {item.start_time.split(' ')[0]}
                </span>
                <span className="text-xs font-bold text-flow-text-primary truncate max-w-[180px] sm:max-w-xs">
                  {item.title}
                </span>
              </div>
              <Badge
                variant={item.status === 'active' ? 'accent' : item.status === 'completed' ? 'success' : 'neutral'}
                size="sm"
                className="text-[10px] shrink-0"
              >
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
