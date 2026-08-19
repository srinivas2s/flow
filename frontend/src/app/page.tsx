'use client';

import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
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
      
      <div className="pt-16">
        {/* Scenes 01 & 02: Chaos & The Question */}
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

      {/* Minimal Footer */}
      <footer className="w-full py-8 border-t border-flow-border/40 text-center text-xs text-flow-muted">
        <p>© 2026 FLOW. Focus • Logic • Orchestration • Workflow. Built for cognitive clarity.</p>
      </footer>
    </main>
  );
}
