'use client';

import React from 'react';
import { Task, PlanItem, AIRecommendation } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Sparkles, Clock, Calendar, CheckCircle2, ArrowRight, TrendingUp, Zap, Plus, Target } from 'lucide-react';
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
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-1">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Today
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary mt-0.5 font-medium">
            {completedTasksCount} of {totalTasksCount} tasks completed
          </p>
        </div>

        <Badge variant="accent" size="sm" icon={<Zap className="w-3.5 h-3.5 text-flow-accent" />}>
          Optimal Focus Window
        </Badge>
      </div>

      {/* Hero Recommendation Card: "YOUR NEXT MOVE" - Clean Neumorphic Surface */}
      {nextMoveTask && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neu-card p-6 sm:p-7 border border-flow-border/80 relative shadow-xl"
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black tracking-widest text-flow-accent uppercase">
                Your Next Move
              </span>
            </div>
            <Badge variant="danger" size="sm">
              {nextMoveTask.priority.toUpperCase()} PRIORITY
            </Badge>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-flow-text-primary tracking-tight mb-3">
            {nextMoveTask.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-semibold">
              <Calendar className="w-3.5 h-3.5 text-flow-accent" />
              <span>{nextMoveTask.deadline || 'Today'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-pressed text-xs text-flow-text-secondary font-semibold">
              <Clock className="w-3.5 h-3.5 text-flow-accent" />
              <span>{nextMoveTask.estimated_minutes} min sprint</span>
            </div>
          </div>

          {/* Clean Context Reason Box */}
          <div className="p-3.5 rounded-xl neu-pressed mb-5 border border-flow-border/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-flow-text-primary mb-1">
              <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
              <span>Why now?</span>
            </div>
            <p className="text-xs text-flow-text-secondary leading-relaxed font-medium">
              {recommendation?.reason ||
                `You have a 45m available window before your 6:00 PM sync. Completing this closes your highest-priority deadline.`}
            </p>
          </div>

          {/* Start Focus Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2 font-bold shadow-md text-sm group"
            onClick={() => onStartFocus(nextMoveTask)}
          >
            <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            <span>Launch Focus Session</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      )}

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenAI}
          className="neu-card p-4 text-left transition-all hover:scale-[1.01] flex items-center gap-3 border border-flow-border/80 shadow-md"
        >
          <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-flow-accent shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-flow-text-primary block">Ask FLOW AI</span>
            <span className="text-[10px] text-flow-muted">Natural queries</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('tasks')}
          className="neu-card p-4 text-left transition-all hover:scale-[1.01] flex items-center gap-3 border border-flow-border/80 shadow-md"
        >
          <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-emerald-500 shrink-0">
            <Plus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-flow-text-primary block">Add Task</span>
            <span className="text-[10px] text-flow-muted">Quick backlog capture</span>
          </div>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="neu-card p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-flow-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Adherence</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-flow-text-primary">{progressPercent}%</span>
            <span className="text-xs text-flow-muted font-medium">on schedule</span>
          </div>
        </div>

        <div className="neu-card p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-flow-muted mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Free Window</span>
            <Clock className="w-4 h-4 text-flow-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-flow-text-primary">45m</span>
            <span className="text-xs text-flow-muted font-medium">before 6 PM</span>
          </div>
        </div>
      </div>

      {/* Today's Sequence */}
      <div className="neu-card p-5 sm:p-6 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-flow-border/60">
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
            <span>Full Plan</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {plan.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                item.status === 'active'
                  ? 'neu-pressed border border-flow-accent/40 bg-flow-accent/5'
                  : item.status === 'completed'
                  ? 'opacity-60 neu-flat'
                  : 'neu-flat'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-black text-flow-text-primary w-14 shrink-0">
                  {item.start_time.split(' ')[0]}
                </span>
                <span className="text-xs font-bold text-flow-text-primary truncate max-w-[170px] sm:max-w-xs">
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
