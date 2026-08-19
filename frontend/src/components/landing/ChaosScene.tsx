'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertCircle, Clock, Calendar, Mail, FileText, CheckCircle, Zap } from 'lucide-react';

export const ChaosScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Chaos fragments opacity and positions based on scroll
  const fragmentsOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.6, 0.75], [0, 1, 1, 0.15]);
  const fragmentsScale = useTransform(scrollYProgress, [0.05, 0.4, 0.7], [0.8, 1, 0.9]);
  const blurValue = useTransform(scrollYProgress, [0.65, 0.85], ['blur(0px)', 'blur(10px)']);
  
  // Question opacity and scale in Scene 02
  const questionOpacity = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [0, 1, 0.2]);
  const questionScale = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [0.9, 1, 1.05]);

  const tasks = [
    { text: 'Assignment due Friday', icon: Calendar, color: 'text-amber-500', top: '15%', left: '8%', delay: 0 },
    { text: 'Meeting 6 PM with team', icon: Clock, color: 'text-blue-500', top: '22%', right: '10%', delay: 0.2 },
    { text: 'Reply to client email', icon: Mail, color: 'text-rose-500', top: '48%', left: '5%', delay: 0.4 },
    { text: 'Hackathon presentation slides', icon: FileText, color: 'text-purple-500', top: '38%', right: '8%', delay: 0.1 },
    { text: 'Study React 19 hooks', icon: Zap, color: 'text-indigo-500', top: '65%', left: '12%', delay: 0.3 },
    { text: 'Buy groceries & prep dinner', icon: CheckCircle, color: 'text-emerald-500', top: '72%', right: '15%', delay: 0.5 },
    { text: 'Project deadline tomorrow 5PM', icon: AlertCircle, color: 'text-red-500', top: '82%', left: '18%', delay: 0.2 },
  ];

  return (
    <section ref={containerRef} className="relative h-[240vh] w-full">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4">
        
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-flow-accent/5 blur-[120px] dark:bg-flow-accent/10" />
        </div>

        {/* Scene 01: Hero Intro + Mental Overload Fragments */}
        <motion.div
          style={{ opacity: fragmentsOpacity, scale: fragmentsScale, filter: blurValue }}
          className="absolute inset-0 pointer-events-none max-w-5xl mx-auto"
        >
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <motion.div
                key={index}
                animate={{
                  y: [-6, 6, -6],
                  rotate: index % 2 === 0 ? [-1, 2, -1] : [2, -2, 2],
                }}
                transition={{
                  duration: 4 + (index % 3),
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
                className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl neu-raised text-xs font-medium text-flow-text-primary shadow-lg border border-flow-border/40 whitespace-nowrap"
              >
                <Icon className={`w-3.5 h-3.5 ${task.color}`} />
                <span>{task.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scene 01 Text: Chaos & Overload */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.55], [1, 1, 0]),
            y: useTransform(scrollYProgress, [0, 0.4], [0, -40]),
          }}
          className="relative z-10 text-center max-w-2xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-pill text-xs font-semibold text-flow-accent mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-flow-accent animate-ping" />
            <span>The Reality of Modern Work</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-flow-text-primary tracking-tight leading-[1.15] mb-6">
            Your day shouldn&apos;t feel like a puzzle.
          </h1>

          <p className="text-base sm:text-xl text-flow-text-secondary font-normal leading-relaxed max-w-xl mx-auto">
            Your tasks, meetings, deadlines, ideas and commitments are everywhere.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-flow-muted">
              Scroll to explore
            </span>
            <div className="w-1 h-6 rounded-full bg-flow-accent/40 mt-2 animate-bounce" />
          </div>
        </motion.div>

        {/* Scene 02: The Emotional Pivot Question */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="max-w-3xl mx-auto">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-flow-accent mb-4 block">
              In the middle of the noise, one question matters:
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-flow-text-primary tracking-tight leading-tight drop-shadow-sm">
              &ldquo;What should I do right now?&rdquo;
            </h2>
            <p className="text-sm sm:text-lg text-flow-text-secondary mt-6 max-w-lg mx-auto">
              Not a list of 50 things. Not another reminder. Just one clear, optimal action.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
