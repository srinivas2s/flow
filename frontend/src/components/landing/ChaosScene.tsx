'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertCircle, Clock, Calendar, Mail, FileText, CheckCircle, Zap, Layers, Sparkles } from 'lucide-react';

export const ChaosScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const fragmentsOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.6, 0.75], [0, 1, 1, 0.1]);
  const fragmentsScale = useTransform(scrollYProgress, [0.05, 0.4, 0.7], [0.75, 1, 0.9]);
  const blurValue = useTransform(scrollYProgress, [0.65, 0.85], ['blur(0px)', 'blur(12px)']);
  
  const questionOpacity = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [0, 1, 0.15]);
  const questionScale = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [0.92, 1, 1.04]);

  const tasks = [
    { text: 'Assignment due Friday', sub: 'DBMS Normalization', icon: Calendar, color: 'text-amber-500', top: '14%', left: '6%', delay: 0 },
    { text: 'Meeting 6 PM', sub: 'Frontend Team Sync', icon: Clock, color: 'text-blue-500', top: '20%', right: '8%', delay: 0.2 },
    { text: 'Reply to client email', sub: 'Contract review request', icon: Mail, color: 'text-rose-500', top: '46%', left: '4%', delay: 0.4 },
    { text: 'Hackathon presentation', sub: 'Finish 3min pitch deck', icon: FileText, color: 'text-purple-500', top: '36%', right: '6%', delay: 0.1 },
    { text: 'Study React 19 hooks', sub: 'Server Actions & Compiler', icon: Zap, color: 'text-indigo-500', top: '64%', left: '10%', delay: 0.3 },
    { text: 'Buy groceries & prep dinner', sub: 'Weekly essentials', icon: CheckCircle, color: 'text-emerald-500', top: '70%', right: '12%', delay: 0.5 },
    { text: 'Project deadline tomorrow', sub: 'High pressure blocker', icon: AlertCircle, color: 'text-red-500', top: '82%', left: '16%', delay: 0.2 },
  ];

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full">
      {/* Sticky Frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4">
        
        {/* Deep ambient lighting */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-flow-accent/10 blur-[140px] ambient-pulse" />
        </div>

        {/* Floating Tactile Neumorphic Fragments */}
        <motion.div
          style={{ opacity: fragmentsOpacity, scale: fragmentsScale, filter: blurValue }}
          className="absolute inset-0 pointer-events-none max-w-6xl mx-auto"
        >
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <motion.div
                key={index}
                animate={{
                  y: [-10, 10, -10],
                  rotate: index % 2 === 0 ? [-2, 2.5, -2] : [2.5, -2, 2.5],
                }}
                transition={{
                  duration: 5 + (index % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: task.delay,
                }}
                style={{
                  position: 'absolute',
                  top: task.top,
                  left: task.left,
                  right: task.right,
                }}
                className="hidden sm:flex items-center gap-3.5 px-4 py-3 rounded-2xl neu-card text-xs font-semibold text-flow-text-primary shadow-2xl border border-flow-border/80 whitespace-nowrap pointer-events-auto hover:scale-105 transition-transform"
              >
                <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${task.color}`} />
                </div>
                <div>
                  <span className="block font-bold text-flow-text-primary">{task.text}</span>
                  <span className="text-[10px] text-flow-muted font-normal">{task.sub}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scene 01: The Overload Narrative */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.22, 0.52], [1, 1, 0]),
            y: useTransform(scrollYProgress, [0, 0.4], [0, -50]),
          }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-pill text-xs font-bold text-flow-accent mb-6"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>The Reality of Modern Workflow</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-flow-text-primary tracking-tight leading-[1.1] mb-6">
            Your day shouldn&apos;t feel like a puzzle.
          </h1>

          <p className="text-base sm:text-xl text-flow-text-secondary font-medium leading-relaxed max-w-xl mx-auto">
            Tasks, meetings, deadlines, ideas, and commitments are scattered across tabs and apps.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-flow-muted">
              Scroll to explore
            </span>
            <div className="w-1.5 h-7 rounded-full bg-flow-accent/40 animate-bounce" />
          </div>
        </motion.div>

        {/* Scene 02: The Emotional Pivot Question */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="max-w-3xl mx-auto p-8 rounded-3xl neu-card border border-flow-border/80 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-pressed text-[11px] font-extrabold uppercase tracking-widest text-flow-accent mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Essential Question</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-flow-text-primary tracking-tight leading-tight">
              &ldquo;What should I do right now?&rdquo;
            </h2>

            <p className="text-sm sm:text-lg text-flow-text-secondary mt-6 max-w-lg mx-auto font-medium">
              Not a list of 50 disconnected items. Just one clear, optimal action that moves your day forward.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
