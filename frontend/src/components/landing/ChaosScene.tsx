'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, Calendar, Mail, FileText, CheckCircle, Zap, Layers, Sparkles, HelpCircle } from 'lucide-react';

export const ChaosScene: React.FC = () => {
  const tasks = [
    { text: 'Assignment due Friday', sub: 'DBMS Normalization', icon: Calendar, color: 'text-amber-500' },
    { text: 'Meeting 6 PM', sub: 'Frontend Team Sync', icon: Clock, color: 'text-blue-500' },
    { text: 'Reply to client email', sub: 'Contract review request', icon: Mail, color: 'text-rose-500' },
    { text: 'Hackathon presentation', sub: 'Finish 3min pitch deck', icon: FileText, color: 'text-purple-500' },
    { text: 'Study React 19 hooks', sub: 'Server Actions & Compiler', icon: Zap, color: 'text-indigo-500' },
    { text: 'Buy groceries & prep dinner', sub: 'Weekly essentials', icon: CheckCircle, color: 'text-emerald-500' },
    { text: 'Project deadline tomorrow', sub: 'High pressure blocker', icon: AlertCircle, color: 'text-red-500' },
  ];

  return (
    <div className="w-full">
      {/* Scene 01: The Overload Narrative */}
      <section className="relative min-h-[90vh] w-full py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
        {/* Deep ambient lighting */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-flow-accent/10 blur-[130px] ambient-pulse" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-pill text-xs font-bold text-flow-accent mb-6"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>The Reality of Modern Workflow</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-flow-text-primary tracking-tight leading-[1.1] mb-6"
          >
            Your day shouldn&apos;t feel like a puzzle.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-lg text-flow-text-secondary font-medium leading-relaxed max-w-xl mx-auto mb-10"
          >
            Tasks, meetings, deadlines, ideas, and commitments are scattered across tabs and apps.
          </motion.p>

          {/* Floating fragments grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto text-left"
          >
            {tasks.map((task, index) => {
              const Icon = task.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3.5 rounded-2xl neu-card text-xs font-semibold text-flow-text-primary shadow-lg border border-flow-border/80 hover:scale-[1.02] transition-transform"
                >
                  <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${task.color}`} />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-bold text-flow-text-primary truncate">{task.text}</span>
                    <span className="text-[10px] text-flow-muted font-normal block truncate">{task.sub}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Scene 02: The Emotional Pivot Question */}
      <section className="relative min-h-[75vh] w-full py-20 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl neu-card border border-flow-border/80 shadow-2xl text-center relative"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-pressed text-[11px] font-extrabold uppercase tracking-widest text-flow-accent mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Essential Question</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-flow-text-primary tracking-tight leading-tight">
            &ldquo;What should I do right now?&rdquo;
          </h2>

          <p className="text-xs sm:text-base text-flow-text-secondary mt-6 max-w-lg mx-auto font-medium leading-relaxed">
            Not a list of 50 disconnected items. Just one clear, optimal action that moves your day forward without cognitive noise.
          </p>
        </motion.div>
      </section>
    </div>
  );
};
