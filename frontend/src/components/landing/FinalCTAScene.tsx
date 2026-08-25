'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const FinalCTAScene: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] w-full py-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-flow-accent/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
      >
        <Logo size="xl" withText={false} animate={true} />

        <h2 className="text-4xl sm:text-6xl font-black text-flow-text-primary tracking-tight mt-6">
          FLOW
        </h2>

        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-flow-accent mt-2">
          Focus • Logic • Orchestration • Workflow
        </p>

        <p className="text-lg sm:text-2xl font-semibold text-flow-text-secondary mt-6">
          Your next move is already waiting.
        </p>

        {/* Symmetric White/Ivory Neumorphic Button with Black Text */}
        <div className="mt-10 w-full max-w-xs">
          <Link href="/app" className="block w-full">
            <button
              className="w-full py-4 rounded-2xl neu-button text-flow-text-primary text-base font-black flex items-center justify-center gap-2.5 shadow-2xl hover:scale-[1.02] transition-all group"
            >
              <span>Enter FLOW</span>
              <ArrowRight className="w-4 h-4 text-flow-accent transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-4 text-xs text-flow-muted">
          <span>No credit card required</span>
          <span>•</span>
          <span>Adaptive AI engine</span>
          <span>•</span>
          <span>Offline-first</span>
        </div>
      </motion.div>
    </section>
  );
};
