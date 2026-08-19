'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Clock, Calendar, AlertTriangle, Brain, ArrowRight, Check } from 'lucide-react';

export const AIUnderstandsScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const rawInputs = [
    {
      raw: '“I have an assignment Friday for DBMS and need to finish the normalization part.”',
      tag: 'Academic Task',
      structured: {
        task: 'Finish DBMS Normalization Assignment',
        deadline: 'Friday, 5:00 PM',
        priority: 'High' as const,
        duration: '45 mins',
        context: 'Requires 45m uninterrupted deep work sprint',
      },
    },
    {
      raw: '“Quick sync meeting at 6 with the frontend team to review design tokens.”',
      tag: 'Team Sync',
      structured: {
        task: 'Frontend Design Token Review Meeting',
        deadline: 'Today, 6:00 PM',
        priority: 'Medium' as const,
        duration: '30 mins',
        context: 'Fixed calendar commitment with team',
      },
    },
    {
      raw: '“Need to prepare for upcoming system design interview questions this weekend.”',
      tag: 'Career Goal',
      structured: {
        task: 'System Design Interview Prep',
        deadline: 'Sunday, 8:00 PM',
        priority: 'High' as const,
        duration: '90 mins',
        context: 'Decomposed into 2x45m study blocks',
      },
    },
  ];

  return (
    <section className="relative min-h-screen w-full py-24 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-flow-accent mb-3 block">
          Cognitive Intelligence
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-flow-text-primary tracking-tight">
          FLOW doesn&apos;t just collect information.
        </h2>
        <h3 className="text-2xl sm:text-4xl font-bold text-flow-accent mt-2">
          FLOW understands it.
        </h3>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-4 max-w-lg mx-auto">
          Natural unstructured thoughts are instantly parsed into task dynamics, duration estimates, energy context, and deadlines.
        </p>
      </div>

      {/* Interactive Demonstration */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Raw Inputs */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary mb-1">
            Raw Natural Input
          </span>
          {rawInputs.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                activeTab === idx
                  ? 'neu-pressed border-flow-accent/40 bg-flow-accent/5'
                  : 'neu-raised border-transparent hover:border-flow-border/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-flow-accent uppercase tracking-wider">
                  {item.tag}
                </span>
                {activeTab === idx && (
                  <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-flow-text-primary font-medium italic">
                {item.raw}
              </p>
            </button>
          ))}
        </div>

        {/* Center Conversion Icon */}
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full neu-raised flex items-center justify-center text-flow-accent shadow-md">
            <ArrowRight className="w-5 h-5 hidden md:block" />
            <Sparkles className="w-5 h-5 md:hidden" />
          </div>
        </div>

        {/* Right: Structured Extraction */}
        <div className="md:col-span-5">
          <span className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary mb-1 block">
            Structured Understanding
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="neu-card p-6 border border-flow-border/50"
            >
              <div className="flex items-center justify-between pb-3 border-b border-flow-border/50">
                <span className="text-xs font-bold text-flow-accent tracking-wider uppercase">
                  Extracted Semantics
                </span>
                <Badge variant={rawInputs[activeTab].structured.priority === 'High' ? 'danger' : 'neutral'} size="sm">
                  {rawInputs[activeTab].structured.priority} Priority
                </Badge>
              </div>

              <div className="mt-4 space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-flow-muted">
                    Task Title
                  </span>
                  <p className="text-sm font-bold text-flow-text-primary mt-0.5">
                    {rawInputs[activeTab].structured.task}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded-xl neu-pressed">
                    <div className="flex items-center gap-1.5 text-flow-muted mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">Deadline</span>
                    </div>
                    <p className="text-xs font-semibold text-flow-text-primary">
                      {rawInputs[activeTab].structured.deadline}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl neu-pressed">
                    <div className="flex items-center gap-1.5 text-flow-muted mb-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">Duration</span>
                    </div>
                    <p className="text-xs font-semibold text-flow-text-primary">
                      {rawInputs[activeTab].structured.duration}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl neu-pressed pt-2">
                  <div className="flex items-center gap-1.5 text-flow-muted mb-1">
                    <Brain className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase">Context & Energy</span>
                  </div>
                  <p className="text-xs text-flow-text-secondary">
                    {rawInputs[activeTab].structured.context}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
