'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Clock, Calendar, Brain, ArrowRight, Check, Send, Zap, Layers } from 'lucide-react';

export const AIUnderstandsScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const rawInputs = [
    {
      raw: '“I have an assignment Friday for DBMS and need to finish the normalization part.”',
      tag: 'Academic',
      structured: {
        task: 'Finish DBMS Normalization Assignment',
        deadline: 'Friday, 5:00 PM',
        priority: 'High' as const,
        duration: '45 mins',
        context: 'Requires 45m uninterrupted deep work sprint',
        energy: 'High Cognitive Peak',
      },
    },
    {
      raw: '“Quick sync meeting at 6 with the frontend team to review design tokens.”',
      tag: 'Collaboration',
      structured: {
        task: 'Frontend Design Token Review Sync',
        deadline: 'Today, 6:00 PM',
        priority: 'Medium' as const,
        duration: '30 mins',
        context: 'Fixed calendar commitment with engineering team',
        energy: 'Collaborative Sync',
      },
    },
    {
      raw: '“Need to prepare for upcoming system design interview questions this weekend.”',
      tag: 'Career Goal',
      structured: {
        task: 'System Design Interview Preparation',
        deadline: 'Sunday, 8:00 PM',
        priority: 'High' as const,
        duration: '90 mins',
        context: 'Decomposed into 2x 45m study blocks',
        energy: 'Analytical Synthesis',
      },
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const currentItem = rawInputs[activeTab];

  return (
    <section className="relative min-h-screen w-full py-28 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-pill text-xs font-bold text-flow-accent mb-3">
          <Brain className="w-3.5 h-3.5" />
          <span>Cognitive Semantic Parser</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-flow-text-primary tracking-tight">
          FLOW doesn&apos;t just collect tasks.
        </h2>
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-flow-accent mt-2 tracking-tight">
          FLOW understands them.
        </h3>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-4 max-w-lg mx-auto font-medium">
          Raw unstructured thoughts are decomposed into exact durations, cognitive energy requirements, and calendar commitments.
        </p>
      </div>

      {/* Interactive Demonstration Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Natural Raw Inputs */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
              Natural Language Dump
            </span>
            <span className="text-[10px] text-flow-muted">Click to test</span>
          </div>

          {rawInputs.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border relative ${
                activeTab === idx
                  ? 'neu-pressed border-flow-accent/50 bg-flow-accent/5 shadow-inner'
                  : 'neu-card border-transparent hover:border-flow-border/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-flow-accent uppercase tracking-wider">
                  {item.tag}
                </span>
                {activeTab === idx && (
                  <div className="w-2 h-2 rounded-full bg-flow-accent animate-ping" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-flow-text-primary font-medium italic leading-relaxed">
                {item.raw}
              </p>
            </button>
          ))}
        </div>

        {/* Center Conversion Icon */}
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full neu-raised flex items-center justify-center text-flow-accent shadow-xl border border-flow-border">
            <ArrowRight className="w-5 h-5 hidden md:block" />
            <Sparkles className="w-5 h-5 md:hidden" />
          </div>
        </div>

        {/* Right Column: Structured Extracted Information */}
        <div className="md:col-span-5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
              Decomposed Representation
            </span>
            <Badge variant="accent" size="sm">
              Extracted
            </Badge>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="neu-card p-6 border border-flow-border/80 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-flow-border/60">
                <span className="text-xs font-bold uppercase tracking-wider text-flow-accent">
                  Structured Task Node
                </span>
                <Badge variant={currentItem.structured.priority === 'High' ? 'danger' : 'neutral'} size="sm">
                  {currentItem.structured.priority} Priority
                </Badge>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-flow-muted">
                  Actionable Objective
                </span>
                <p className="text-sm sm:text-base font-bold text-flow-text-primary mt-0.5">
                  {currentItem.structured.task}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl neu-pressed">
                  <div className="flex items-center gap-1.5 text-flow-muted mb-1">
                    <Calendar className="w-3.5 h-3.5 text-flow-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Deadline</span>
                  </div>
                  <p className="text-xs font-bold text-flow-text-primary">
                    {currentItem.structured.deadline}
                  </p>
                </div>

                <div className="p-3 rounded-xl neu-pressed">
                  <div className="flex items-center gap-1.5 text-flow-muted mb-1">
                    <Clock className="w-3.5 h-3.5 text-flow-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Time Budget</span>
                  </div>
                  <p className="text-xs font-bold text-flow-text-primary">
                    {currentItem.structured.duration}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl neu-pressed">
                <div className="flex items-center gap-1.5 text-flow-muted mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Cognitive Profile</span>
                </div>
                <p className="text-xs text-flow-text-secondary font-medium">
                  {currentItem.structured.context} • <strong>{currentItem.structured.energy}</strong>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
