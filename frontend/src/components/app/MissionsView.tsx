'use client';

import React, { useState } from 'react';
import { Mission, Task } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { 
  Rocket, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Play, 
  Code2, 
  Database, 
  FileText, 
  Target, 
  FolderKanban,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionsViewProps {
  onStartFocus: (task: Task) => void;
  onAddTask: (task: Partial<Task>) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({ onStartFocus, onAddTask }) => {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'm-1',
      title: 'DBMS Semester Project & Normalization',
      description: 'End-to-end relational schema design, 3NF & BCNF decomposition, indexing optimization, and final report submission.',
      category: 'Academic',
      target_deadline: 'August 28, 2026',
      status: 'active',
      progress: 65,
      totalTasks: 6,
      completedTasks: 4,
      connectedTools: ['PostgreSQL MCP', 'Notion Specs', 'Syllabus PDF'],
      systemContext: 'Focus strictly on relational algebra proofs and functional dependencies. Target clean schema with zero anomalies.',
      phases: [
        { id: 'p1', title: 'Phase 1: Functional Dependencies & Keys', status: 'completed', tasksCount: 2, completedTasksCount: 2 },
        { id: 'p2', title: 'Phase 2: 3NF & BCNF Decomposition Tables', status: 'active', tasksCount: 2, completedTasksCount: 1 },
        { id: 'p3', title: 'Phase 3: SQL Verification & PDF Report', status: 'upcoming', tasksCount: 2, completedTasksCount: 1 },
      ],
    },
    {
      id: 'm-2',
      title: 'FLOW v1.0 Production Launch',
      description: 'Complete Neumorphic UI design system, FastAPI backend orchestration, Vercel Serverless deployment, and QA validation.',
      category: 'Engineering',
      target_deadline: 'August 25, 2026',
      status: 'active',
      progress: 90,
      totalTasks: 10,
      completedTasks: 9,
      connectedTools: ['GitHub MCP', 'Vercel Deployment', 'Design Tokens'],
      systemContext: 'Strict zero-emoji aesthetic rule, warm Ivory light mode, obsidian dark mode with architectural white grid.',
      phases: [
        { id: 'p1', title: 'Phase 1: Next.js 15 & Neumorphic Design Tokens', status: 'completed', tasksCount: 4, completedTasksCount: 4 },
        { id: 'p2', title: 'Phase 2: FastAPI REST & Recommendation Engine', status: 'completed', tasksCount: 3, completedTasksCount: 3 },
        { id: 'p3', title: 'Phase 3: Full Suite Polish & Vercel Push', status: 'active', tasksCount: 3, completedTasksCount: 2 },
      ],
    },
    {
      id: 'm-3',
      title: 'System Design Interview Mastery',
      description: 'Distributed cache invalidation, rate limiters, database sharding, and consensus algorithms preparation for senior engineering loops.',
      category: 'Career',
      target_deadline: 'September 15, 2026',
      status: 'active',
      progress: 30,
      totalTasks: 8,
      completedTasks: 2,
      connectedTools: ['Brave Web Search', 'Linear Knowledge', 'Mock Sheets'],
      systemContext: 'Synthesize trade-offs between availability and consistency (CAP Theorem). Prepare 45m whiteboard architecture diagrams.',
      phases: [
        { id: 'p1', title: 'Phase 1: Storage & Consistent Hashing Fundamentals', status: 'completed', tasksCount: 3, completedTasksCount: 2 },
        { id: 'p2', title: 'Phase 2: Real-time Messaging & Pub/Sub Systems', status: 'active', tasksCount: 3, completedTasksCount: 0 },
        { id: 'p3', title: 'Phase 3: Full Mock System Design Interviews', status: 'upcoming', tasksCount: 2, completedTasksCount: 0 },
      ],
    },
  ]);

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Mission Form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Engineering');
  const [newDeadline, setNewDeadline] = useState('September 30, 2026');

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Mission = {
      id: `m-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'AI-decomposed strategic project workspace.',
      category: newCategory,
      target_deadline: newDeadline,
      status: 'active',
      progress: 0,
      totalTasks: 6,
      completedTasks: 0,
      connectedTools: ['Google Calendar MCP', 'Knowledge Graph'],
      systemContext: `Automated project container for ${newTitle.trim()}.`,
      phases: [
        { id: 'p1', title: 'Phase 1: Research & Requirements Breakdown', status: 'active', tasksCount: 2, completedTasksCount: 0 },
        { id: 'p2', title: 'Phase 2: Core Execution & Implementation', status: 'upcoming', tasksCount: 2, completedTasksCount: 0 },
        { id: 'p3', title: 'Phase 3: Final Verification & Delivery', status: 'upcoming', tasksCount: 2, completedTasksCount: 0 },
      ],
    };

    setMissions([created, ...missions]);
    
    // Automatically generate first task in general backlog
    onAddTask({
      title: `${newTitle.trim()}: Phase 1 Architecture Kickoff`,
      description: `Kickoff task for mission ${newTitle.trim()}`,
      deadline: newDeadline,
      estimated_minutes: 45,
      priority: 'high',
      status: 'todo',
    });

    setNewTitle('');
    setNewDesc('');
    setIsCreateModalOpen(false);
    setSelectedMission(created);
  };

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Missions & Projects
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Macro-objectives decomposed into dedicated execution flows
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-1.5 font-bold shadow-lg min-h-[42px] px-4"
        >
          <Plus className="w-4 h-4" />
          <span>New Mission</span>
        </Button>
      </div>

      {/* Selected Mission Workspace Details */}
      {selectedMission ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 sm:p-8 border border-flow-border/80 shadow-2xl space-y-6"
        >
          {/* Back button & Meta */}
          <div className="flex items-center justify-between pb-4 border-b border-flow-border/60">
            <button
              onClick={() => setSelectedMission(null)}
              className="text-xs font-bold text-flow-accent hover:underline flex items-center gap-1"
            >
              <span>← All Missions</span>
            </button>
            <Badge variant="accent" size="sm">
              {selectedMission.category.toUpperCase()}
            </Badge>
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-flow-accent block mb-1">
              Active Project Workspace
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
              {selectedMission.title}
            </h2>
            <p className="text-xs sm:text-sm text-flow-text-secondary mt-2 leading-relaxed font-medium">
              {selectedMission.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-flow-muted uppercase tracking-wider">Mission Progress</span>
              <span className="text-flow-accent">{selectedMission.progress}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full neu-pressed overflow-hidden">
              <div
                className="h-full bg-flow-accent rounded-full transition-all duration-500"
                style={{ width: `${selectedMission.progress}%` }}
              />
            </div>
          </div>

          {/* Mission System Context */}
          {selectedMission.systemContext && (
            <div className="p-4 rounded-2xl neu-pressed border border-flow-border/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-flow-text-primary">
                <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
                <span>Dedicated Project Context & Guardrails</span>
              </div>
              <p className="text-xs text-flow-text-secondary font-medium">
                {selectedMission.systemContext}
              </p>
            </div>
          )}

          {/* Sequenced Phases */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-flow-muted">
              Sequenced Milestone Phases
            </h3>

            <div className="space-y-2.5">
              {selectedMission.phases.map((phase, idx) => (
                <div
                  key={phase.id}
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 border ${
                    phase.status === 'completed'
                      ? 'neu-flat opacity-70 border-flow-border/40'
                      : phase.status === 'active'
                      ? 'neu-pressed border-flow-accent/50 bg-flow-accent/5'
                      : 'neu-raised border-flow-border/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        phase.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : phase.status === 'active'
                          ? 'bg-flow-accent text-white'
                          : 'neu-pressed text-flow-muted'
                      }`}
                    >
                      {phase.status === 'completed' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-flow-text-primary">
                      {phase.title}
                    </span>
                  </div>

                  <Badge
                    variant={phase.status === 'completed' ? 'success' : phase.status === 'active' ? 'accent' : 'neutral'}
                    size="sm"
                    className="text-[10px] shrink-0"
                  >
                    {phase.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Tools */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-flow-muted block mb-2">
              Connected Tools & Documents
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedMission.connectedTools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl neu-pressed text-xs font-semibold text-flow-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Start Mission Sprint Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2 font-bold shadow-lg"
            onClick={() =>
              onStartFocus({
                id: `mission-task-${selectedMission.id}`,
                title: `${selectedMission.title} Sprint`,
                priority: 'high',
                estimated_minutes: 45,
                status: 'todo',
                created_at: new Date().toISOString(),
              })
            }
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Mission Focus Sprint</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      ) : (
        /* Missions Overview Grid */
        <div className="space-y-4">
          {missions.map((m) => (
            <motion.div
              layout
              key={m.id}
              onClick={() => setSelectedMission(m)}
              className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl cursor-pointer hover:scale-[1.01] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Rocket className="w-4 h-4 text-flow-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-flow-accent">
                      {m.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-flow-text-primary tracking-tight">
                    {m.title}
                  </h3>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Badge variant="accent" size="sm">
                    {m.progress}%
                  </Badge>
                  <ChevronRight className="w-5 h-5 text-flow-muted" />
                </div>
              </div>

              <p className="text-xs text-flow-text-secondary line-clamp-2 mt-1 mb-4 font-medium leading-relaxed">
                {m.description}
              </p>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full neu-pressed overflow-hidden mb-4">
                <div
                  className="h-full bg-flow-accent rounded-full"
                  style={{ width: `${m.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-flow-muted font-medium pt-2 border-t border-flow-border/40">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-flow-accent" />
                  Target: {m.target_deadline}
                </span>
                <span>{m.phases.length} Execution Phases</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Mission Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Mission / Big Objective"
      >
        <form onSubmit={handleCreateMission} className="space-y-4">
          <Input
            label="Mission Goal / Objective"
            placeholder="e.g. Master System Design Interviews"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            autoFocus
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
              Strategic Description & Context
            </label>
            <textarea
              className="w-full rounded-2xl p-3 text-sm neu-input placeholder:text-flow-muted min-h-[75px]"
              placeholder="What does success look like? Any specific constraints..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
                Category
              </label>
              <select
                className="rounded-2xl p-3 text-sm neu-input bg-transparent font-bold"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Academic">Academic</option>
                <option value="Career">Career</option>
                <option value="Startup">Startup</option>
              </select>
            </div>

            <Input
              label="Target Deadline"
              placeholder="e.g. September 30, 2026"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="flex-1 font-bold">
              Initialize Mission
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
