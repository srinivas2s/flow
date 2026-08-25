'use client';

import React, { useState } from 'react';
import { Task, PlanItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, CheckCircle2, AlertCircle, Sparkles, Play, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarViewProps {
  tasks: Task[];
  plan: PlanItem[];
  onStartFocus: (task: Task) => void;
  onAddTask: (task: Partial<Task>) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  plan,
  onStartFocus,
  onAddTask,
}) => {
  // Calendar State: August 2026
  const [selectedDay, setSelectedDay] = useState<number>(25);
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Days in August 2026: starts on Saturday (idx 6), 31 days
  const daysInMonth = 31;
  const startDayOffset = 6; // Saturday

  // Mock scheduled events per date
  const eventsByDay: Record<number, { title: string; time: string; type: 'task' | 'meeting' | 'deadline'; priority?: 'high' | 'medium' }[]> = {
    15: [
      { title: 'Project FLOW Initialization', time: '09:00 AM', type: 'task', priority: 'high' },
      { title: 'Frontend Architecture Sync', time: '02:00 PM', type: 'meeting' },
    ],
    18: [
      { title: 'Design System & Tokens Review', time: '11:00 AM', type: 'task', priority: 'medium' },
      { title: 'Sprint 1 Standup', time: '04:30 PM', type: 'meeting' },
    ],
    21: [
      { title: 'FastAPI Backend Endpoints', time: '10:00 AM', type: 'task', priority: 'high' },
      { title: 'API Contract Review', time: '03:00 PM', type: 'meeting' },
    ],
    24: [
      { title: 'Neumorphism Polish & Mobile QA', time: '01:00 PM', type: 'task', priority: 'high' },
    ],
    25: [
      { title: 'Finish DBMS Normalization', time: '04:45 PM', type: 'deadline', priority: 'high' },
      { title: 'Engineering Team Sync', time: '06:00 PM', type: 'meeting' },
      { title: 'React 19 Hooks Study Sprint', time: '08:00 PM', type: 'task', priority: 'medium' },
    ],
    28: [
      { title: 'DBMS Assignment Final Submission', time: '05:00 PM', type: 'deadline', priority: 'high' },
    ],
    30: [
      { title: 'System Design Mock Interview', time: '08:00 PM', type: 'task', priority: 'high' },
    ],
  };

  const selectedEvents = eventsByDay[selectedDay] || [];

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Calendar
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Timeline commitments and date-level cognitive workload
          </p>
        </div>

        <Badge variant="accent" size="sm" icon={<CalendarIcon className="w-3.5 h-3.5 text-flow-accent" />}>
          August 2026
        </Badge>
      </div>

      {/* Month Navigation & Grid */}
      <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-flow-border/60">
          <h2 className="text-base sm:text-lg font-black text-flow-text-primary">
            {currentMonth}
          </h2>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
              className="p-2 rounded-xl neu-button text-flow-muted hover:text-flow-text-primary min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedDay(Math.min(31, selectedDay + 1))}
              className="p-2 rounded-xl neu-button text-flow-muted hover:text-flow-text-primary min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day of week headers */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-flow-muted">
              {d}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty offset padding */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="h-10 sm:h-12 rounded-xl opacity-0 pointer-events-none" />
          ))}

          {/* Days 1 to 31 */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isSelected = selectedDay === dayNum;
            const hasEvents = !!eventsByDay[dayNum];
            const isToday = dayNum === 25;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`relative h-10 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all min-h-[40px] ${
                  isSelected
                    ? 'neu-pressed border border-flow-accent/60 bg-flow-accent/10 shadow-inner'
                    : isToday
                    ? 'neu-raised border border-flow-accent/40 font-black'
                    : 'neu-raised hover:scale-[1.03]'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    isSelected
                      ? 'text-flow-accent font-black'
                      : isToday
                      ? 'text-flow-accent font-black'
                      : 'text-flow-text-primary'
                  }`}
                >
                  {dayNum}
                </span>

                {/* Event Indicator Dot */}
                {hasEvents && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-flow-accent' : 'bg-flow-accent/80'
                      }`}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date-Level Day Inspector */}
      <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-flow-border/60">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-flow-accent" />
            <h3 className="text-sm font-black text-flow-text-primary">
              Schedule for August {selectedDay}, 2026
            </h3>
          </div>
          <Badge variant={selectedDay === 25 ? 'accent' : 'neutral'} size="sm">
            {selectedDay === 25 ? 'Today' : `${selectedEvents.length} Items`}
          </Badge>
        </div>

        {selectedEvents.length === 0 ? (
          <div className="py-8 text-center neu-pressed rounded-2xl border border-flow-border/40">
            <Clock className="w-7 h-7 text-flow-muted mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold text-flow-text-primary">No commitments scheduled</p>
            <span className="text-[11px] text-flow-muted">Your calendar is completely open for deep work.</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {selectedEvents.map((evt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl neu-raised flex items-center justify-between gap-3 border border-flow-border/60 hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-black text-flow-text-primary w-16 shrink-0">
                    {evt.time}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-flow-text-primary truncate">
                      {evt.title}
                    </p>
                    <span className="text-[10px] text-flow-muted font-medium uppercase tracking-wider block">
                      {evt.type} {evt.priority ? `• ${evt.priority} priority` : ''}
                    </span>
                  </div>
                </div>

                <Badge
                  variant={evt.type === 'deadline' ? 'danger' : evt.type === 'meeting' ? 'warning' : 'accent'}
                  size="sm"
                  className="shrink-0 text-[10px]"
                >
                  {evt.type.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
