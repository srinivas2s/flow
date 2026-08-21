'use client';

import React from 'react';
import { Task, PlanItem, AIRecommendation } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Sparkles, Clock, Calendar, CheckCircle2, ArrowRight, Layers, Flame, TrendingUp } from 'lucide-react';
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
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-flow-text-primary tracking-tight">
            Today&apos;s Focus
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary mt-0.5">
            {completedTasksCount} of {totalTasksCount} commitments fulfilled
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm" icon={<Flame className="w-3.5 h-3.5 text-flow-accent" />}>
            Flow Active
          </Badge>
        </div>
      </div>

      {/* Hero Recommendation: "YOUR NEXT MOVE" */}
      {nextMoveTask && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neu-card p-6 sm:p-7 border border-flow-border/80 relative overflow-hidden"
        >
          {/* Subtle accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-flow-accent to-indigo-500" />

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold tracking-widest text-flow-accent uppercase">
                Your Next Move
              </span>
            </div>
            <Badge variant="danger" size="sm">
              {nextMoveTask.priority.toUpperCase()}
            </Badge>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-flow-text-primary tracking-tight mb-3">
            {nextMoveTask.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl neu-pressed text-xs text-flow-text-secondary">
              <Calendar className="w-3 h-3 text-flow-accent" />
              <span>{nextMoveTask.deadline || 'Today'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl neu-pressed text-xs text-flow-text-secondary">
              <Clock className="w-3 h-3 text-flow-accent" />
              <span>{nextMoveTask.estimated_minutes} min duration</span>
            </div>
          </div>

          {/* Why Now Reason Box */}
          <div className="p-3.5 rounded-2xl neu-pressed mb-5 border border-flow-border/30">
            <div className="flex items-center gap-1.5 text-xs font-bold text-flow-text-primary mb-1">
              <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
              <span>Why now?</span>
            </div>
            <p className="text-xs text-flow-text-secondary leading-relaxed">
              {recommendation?.reason ||
                `You have an optimal work block available. Completing this keeps your daily momentum high.`}
            </p>
          </div>

          {/* Start Focus Button */}
          <Button
            variant="primary"
            size="md"
            className="w-full gap-2 font-bold shadow-md"
            onClick={() => onStartFocus(nextMoveTask)}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Focus Session</span>
          </Button>
        </motion.div>
      )}

      {/* Daily Progress & Metrics Bar */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="neu-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-flow-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Plan Adherence</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-flow-text-primary">{progressPercent}%</span>
            <span className="text-[11px] text-flow-muted">on schedule</span>
          </div>
        </div>

        <div className="neu-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-flow-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Block</span>
            <Clock className="w-4 h-4 text-flow-accent" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-flow-text-primary">45m</span>
            <span className="text-[11px] text-flow-muted">before 6 PM</span>
          </div>
        </div>
      </div>

      {/* Today's Schedule Quick View */}
      <div className="neu-card p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-flow-border/50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-flow-accent" />
            <h3 className="text-sm font-bold text-flow-text-primary uppercase tracking-wider">
              Today&apos;s Sequence
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('plan')}
            className="text-xs font-semibold text-flow-accent hover:underline flex items-center gap-1"
          >
            <span>View Plan</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {plan.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2.5 rounded-xl ${
                item.status === 'active'
                  ? 'neu-pressed border border-flow-accent/30 bg-flow-accent/5'
                  : item.status === 'completed'
                  ? 'opacity-60 neu-flat'
                  : 'neu-flat'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-flow-text-primary w-16">
                  {item.start_time.split(' ')[0]}
                </span>
                <span className="text-xs font-medium text-flow-text-primary truncate max-w-[180px] sm:max-w-xs">
                  {item.title}
                </span>
              </div>
              <Badge
                variant={item.status === 'active' ? 'accent' : item.status === 'completed' ? 'success' : 'neutral'}
                size="sm"
                className="text-[10px]"
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
