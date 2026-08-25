'use client';

import React, { useState } from 'react';
import { PlanItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, RefreshCw, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Zap, Coffee, BookOpen, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanTimelineViewProps {
  plan: PlanItem[];
  onRecalculate: () => void;
  isRecalculating?: boolean;
}

export const PlanTimelineView: React.FC<PlanTimelineViewProps> = ({
  plan,
  onRecalculate,
  isRecalculating = false,
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const getTypeIcon = (type: PlanItem['type']) => {
    switch (type) {
      case 'deep_work':
        return <Zap className="w-3.5 h-3.5 text-flow-accent" />;
      case 'break':
        return <Coffee className="w-3.5 h-3.5 text-amber-500" />;
      case 'meeting':
        return <Users className="w-3.5 h-3.5 text-blue-500" />;
      case 'task':
      default:
        return <BookOpen className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  const getStatusBadge = (status: PlanItem['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="accent" size="sm">Active</Badge>;
      case 'completed':
        return <Badge variant="success" size="sm">Done</Badge>;
      case 'skipped':
        return <Badge variant="warning" size="sm">Skipped</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Scheduled</Badge>;
    }
  };

  return (
    <div className="space-y-5 pb-28 max-w-2xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Daily Plan
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Dynamic sequence synchronized to your energy peaks
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onRecalculate}
          isLoading={isRecalculating}
          className="gap-1.5 font-bold shadow-md min-h-[42px] px-4"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
          <span>Re-Plan</span>
        </Button>
      </div>

      {/* Adaptive Banner */}
      <div className="neu-card p-4 sm:p-5 border border-flow-accent/40 bg-flow-accent/5 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl neu-raised flex items-center justify-center text-flow-accent shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-flow-text-primary">
              Adaptive Timeline Active
            </p>
            <p className="text-[11px] text-flow-text-secondary font-medium mt-0.5">
              If an event overruns, click Re-Plan to automatically rebalance your commitments.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Timeline Items */}
      <div className="relative space-y-3 pl-3 sm:pl-5">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-[38px] sm:left-[46px] top-4 bottom-4 w-0.5 bg-flow-border/80 -z-0" />

        <AnimatePresence>
          {plan.map((item, index) => {
            const isSelected = activeItem === item.id;
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                onClick={() => setActiveItem(isSelected ? null : item.id)}
                className={`relative z-10 neu-card p-3.5 sm:p-5 cursor-pointer transition-all duration-200 border ${
                  item.status === 'active'
                    ? 'border-flow-accent shadow-xl neu-raised'
                    : isSelected
                    ? 'border-flow-border neu-pressed'
                    : 'border-flow-border/70 hover:border-flow-border'
                }`}
              >
                <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                  <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                    {/* Time node chip */}
                    <div className="w-14 sm:w-18 text-right shrink-0 pt-0.5">
                      <span className="text-xs font-black text-flow-text-primary block leading-tight">
                        {item.start_time.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-flow-muted font-medium">
                        {item.end_time.split(' ')[0]}
                      </span>
                    </div>

                    {/* Timeline Node Dot */}
                    <div
                      className={`w-4 h-4 rounded-full neu-raised border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        item.status === 'active'
                          ? 'border-flow-accent bg-flow-accent text-white ring-4 ring-flow-accent/20'
                          : item.status === 'completed'
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-500'
                          : 'border-flow-muted/60 bg-flow-surface'
                      }`}
                    >
                      {item.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-flow-muted flex items-center gap-1">
                          {getTypeIcon(item.type)}
                          {item.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-flow-muted">• {item.duration_minutes} min</span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-flow-text-primary leading-snug">
                        {item.title}
                      </h3>

                      {item.reason && (
                        <p className="text-xs text-flow-text-secondary mt-1 font-medium">
                          {item.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
