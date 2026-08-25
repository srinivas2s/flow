'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  CheckSquare, 
  Calendar, 
  Cpu, 
  FileText, 
  Mail, 
  RefreshCw, 
  Target, 
  Brain, 
  Sparkles, 
  ArrowRight,
  Clock,
  Layers,
  Zap,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export const FeatureHighlightsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 'calendar',
      title: 'Calendar & Day Inspector',
      tagline: 'Date-level cognitive schedule intelligence',
      desc: 'Interactive monthly & weekly calendar with visual commitment markers. Click any date to view all deadlines, scheduled focus blocks, and meetings.',
      icon: Calendar,
      badge: 'Interactive Calendar',
      preview: {
        title: 'Schedule for August 25, 2026',
        items: [
          { time: '04:45 PM', text: 'Finish DBMS Normalization Part 1', type: 'Deadline' },
          { time: '06:00 PM', text: 'Engineering Team Sync', type: 'Meeting' },
          { time: '08:00 PM', text: 'React 19 Hooks Study Sprint', type: 'Focus' },
        ],
      },
    },
    {
      id: 'mcp',
      title: 'AI MCP Multi-Tool Hub',
      tagline: 'Orchestrate external tools in one platform',
      desc: 'Unified Model Context Protocol (MCP) server hub. Connect GitHub, Google Calendar, Notion, Linear, Postgres, and Brave Search into automated agent pipelines.',
      icon: Cpu,
      badge: 'Model Context Protocol',
      preview: {
        title: 'Connected MCP Server Gateway',
        items: [
          { time: 'Active', text: 'Google Calendar MCP • 4 Tools (Sync & Free Slots)', type: 'Online' },
          { time: 'Active', text: 'GitHub MCP • 8 Tools (PRs & Issue Tracking)', type: 'Online' },
          { time: 'Active', text: 'Notion Knowledge MCP • 6 Tools (Project Specs)', type: 'Online' },
        ],
      },
    },
    {
      id: 'docs',
      title: 'Document & Data Ingest',
      tagline: 'Upload PDFs & notes to auto-generate tasks',
      desc: 'Drop in course syllabi, project briefs, or meeting transcripts. FLOW automatically decomposes text into time budgets, milestones, and scheduled deadlines.',
      icon: FileText,
      badge: 'Semantic Parser',
      preview: {
        title: 'Extracted Milestones from Syllabus.pdf',
        items: [
          { time: '35m focus', text: 'Decompose 3NF Normalization tables', type: 'Task' },
          { time: '45m focus', text: 'Verify Lossless Join & BCNF constraints', type: 'Task' },
          { time: 'Aug 28', text: 'Submit PDF report to faculty portal', type: 'Deadline' },
        ],
      },
    },
    {
      id: 'email',
      title: 'Smart Email Auto-Scheduler',
      tagline: 'Automated inbox scanning & calendar sync',
      desc: 'Reads incoming emails from professors, leads, and clients. Detects hidden deadlines and meeting invites, then auto-schedules them into your daily plan with 1 click.',
      icon: Mail,
      badge: 'Inbox Intelligence',
      preview: {
        title: 'Detected Email Commitments',
        items: [
          { time: 'Today 6 PM', text: 'Design Token Migration Sync (Team Lead)', type: 'Meeting' },
          { time: 'Fri 5 PM', text: 'DBMS Normalization Assignment Submission', type: 'Deadline' },
        ],
      },
    },
    {
      id: 'todo',
      title: 'Smart To-Do Matrix',
      tagline: 'Execution-first task management',
      desc: 'Prioritized by cognitive weight, urgency, and duration. Includes subtask checklists, quick inline completion, and deep focus launcher.',
      icon: CheckSquare,
      badge: 'To-Do Matrix',
      preview: {
        title: 'Priority Backlog & Subtasks',
        items: [
          { time: 'High Priority', text: 'Finish DBMS Normalization (3/3 milestones)', type: 'Active' },
          { time: 'Medium', text: 'Review React 19 Compiler documentation', type: 'Queued' },
        ],
      },
    },
    {
      id: 'adaptive',
      title: 'Adaptive Re-Plan Engine',
      tagline: 'Zero guilt when schedules change',
      desc: 'When meetings overrun or tasks take longer than planned, FLOW automatically shifts downstream events into open time slots.',
      icon: RefreshCw,
      badge: 'Dynamic Replanner',
      preview: {
        title: 'Real-time Schedule Rebalance',
        items: [
          { time: 'Shifted', text: 'DBMS moved to 04:45 PM slot before 6 PM sync', type: 'Balanced' },
          { time: 'Protected', text: '6:00 PM Team Sync preserved without conflicts', type: 'Locked' },
        ],
      },
    },
  ];

  const current = features[activeTab];
  const Icon = current.icon;

  return (
    <section id="intelligence" className="relative w-full py-28 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-pill text-xs font-bold text-flow-accent mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Execution Suite</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-flow-text-primary tracking-tight">
          Everything you need to <span className="text-flow-accent">execute.</span>
        </h2>
        <p className="text-sm sm:text-base text-flow-text-secondary mt-3 max-w-lg mx-auto font-medium">
          Built from the ground up to replace fragmented to-do apps, manual calendars, and disconnected bots.
        </p>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {features.map((feat, idx) => {
          const FeatIcon = feat.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={feat.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3.5 rounded-2xl flex flex-col items-center text-center transition-all min-h-[82px] justify-center ${
                isActive
                  ? 'neu-pressed text-flow-accent border border-flow-accent/40 bg-flow-accent/5 font-black shadow-inner'
                  : 'neu-card border border-flow-border/70 text-flow-text-secondary hover:text-flow-text-primary'
              }`}
            >
              <FeatIcon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-flow-accent' : 'text-flow-muted'}`} />
              <span className="text-xs font-bold leading-tight">{feat.title.split('&')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Active Feature Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="neu-card p-6 sm:p-10 border border-flow-border/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-pressed text-[11px] font-bold uppercase tracking-wider text-flow-accent">
              <Icon className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-flow-text-primary tracking-tight">
              {current.title}
            </h3>

            <p className="text-sm font-semibold text-flow-accent">
              {current.tagline}
            </p>

            <p className="text-xs sm:text-sm text-flow-text-secondary leading-relaxed font-medium">
              {current.desc}
            </p>

            <div className="pt-2">
              <Link href="/app">
                <Button variant="primary" size="md" className="gap-2 font-bold shadow-lg text-xs sm:text-sm">
                  <span>Launch in App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Tactile Live Feature Mockup */}
          <div className="lg:col-span-6">
            <div className="neu-pressed p-5 sm:p-6 rounded-3xl border border-flow-border/60 space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-flow-border/40">
                <span className="text-xs font-bold text-flow-text-primary">
                  {current.preview.title}
                </span>
                <Badge variant="accent" size="sm">
                  Live View
                </Badge>
              </div>

              <div className="space-y-2.5">
                {current.preview.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl neu-raised flex items-center justify-between gap-3 text-left border border-flow-border/50"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-flow-text-primary block truncate">
                        {item.text}
                      </span>
                      <span className="text-[10px] text-flow-muted font-semibold">
                        {item.time}
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md neu-pressed text-flow-accent shrink-0">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
