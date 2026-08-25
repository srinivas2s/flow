'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Entering FLOW',
  submessage = 'Calibrating cognitive focus and adaptive timeline...',
}) => {
  const pleasantQuotes = [
    'Calibrating cognitive energy peaks...',
    'Orchestrating distraction-free execution path...',
    'Synthesizing upcoming deadlines & commitments...',
    'Connecting MCP multi-tool execution gateway...',
    'Securing deep focus state...',
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % pleasantQuotes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [pleasantQuotes.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-flow-bg text-flow-text-primary px-6 select-none overflow-hidden">
      {/* Serene Ambient Aura Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-flow-accent/15 blur-[140px] pointer-events-none ambient-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Breathing Logo Icon with Neumorphic Well */}
        <div className="w-24 h-24 rounded-3xl neu-card flex items-center justify-center p-5 mb-8 shadow-2xl border border-flow-border/80">
          <Logo size="lg" withText={false} animate={true} />
        </div>

        {/* Minimal Title */}
        <h2 className="text-xl sm:text-2xl font-black text-flow-text-primary tracking-tight mb-2">
          {message}
        </h2>

        {/* Calming Animated Status Pulse */}
        <div className="h-6 flex items-center justify-center my-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-flow-accent font-bold tracking-wide"
            >
              {pleasantQuotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Subtle Tactile Progress Track */}
        <div className="w-48 h-1.5 rounded-full neu-pressed overflow-hidden mt-4 border border-flow-border/40">
          <motion.div
            className="h-full bg-flow-accent rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-12 flex items-center gap-1.5 text-[11px] text-flow-muted font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Cognitive Clarity Engine Ready</span>
        </div>
      </div>
    </div>
  );
};
