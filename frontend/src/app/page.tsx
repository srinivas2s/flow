'use client';

import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ChaosScene } from '@/components/landing/ChaosScene';
import { FlowRevealScene } from '@/components/landing/FlowRevealScene';
import { AIUnderstandsScene } from '@/components/landing/AIUnderstandsScene';
import { NextMoveScene } from '@/components/landing/NextMoveScene';
import { AdaptivePlanScene } from '@/components/landing/AdaptivePlanScene';
import { FocusScene } from '@/components/landing/FocusScene';
import { PhilosophyScene } from '@/components/landing/PhilosophyScene';
import { FinalCTAScene } from '@/components/landing/FinalCTAScene';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-flow-bg text-flow-text-primary overflow-x-hidden selection:bg-flow-accent/20">
      <LandingNavbar />
      
      <div>
        {/* Hero Section with Interactive State Comparator */}
        <HeroSection />

        {/* Scene 01 & 02: Chaos & The Question */}
        <ChaosScene />

        {/* Scene 03: Meet FLOW Reveal */}
        <FlowRevealScene />

        {/* Scene 04: AI Understands Inputs */}
        <AIUnderstandsScene />

        {/* Scene 05: What Should I Do Now? Card */}
        <NextMoveScene />

        {/* Scene 06: Adaptive Replanning Simulation */}
        <AdaptivePlanScene />

        {/* Scene 07: Distraction-Free Focus Execution */}
        <FocusScene />

        {/* Scene 08: The Philosophy */}
        <PhilosophyScene />

        {/* Scene 09: Final Call to Action */}
        <FinalCTAScene />
      </div>

      {/* Minimalist Footer */}
      <footer className="w-full py-10 border-t border-flow-border/50 text-center text-xs text-flow-muted px-4">
        <p className="font-semibold text-flow-text-primary mb-1">FLOW</p>
        <p>Focus • Logic • Orchestration • Workflow</p>
        <p className="text-[11px] text-flow-muted mt-2">© 2026 FLOW. Built for cognitive clarity and human execution.</p>
      </footer>
    </main>
  );
}
