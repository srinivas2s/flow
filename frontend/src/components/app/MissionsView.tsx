'use client';

import React, { useState } from 'react';
import { Mission, Task, Priority } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { 
  Rocket, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar as CalendarIcon, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Play, 
  Check, 
  CheckSquare, 
  Bot, 
  Send, 
  Layers, 
  FileText,
  Database,
  Code2,
  TrendingUp,
  Cpu,
  BarChart2,
  BookOpen,
  FolderOpen
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
      totalTasks: 4,
      completedTasks: 2,
      connectedTools: ['PostgreSQL MCP', 'Notion Specs', 'Syllabus PDF'],
      systemContext: 'Focus strictly on relational algebra proofs and functional dependencies. Target clean schema with zero anomalies.',
      phases: [
        { id: 'p1', title: 'Phase 1: Functional Dependencies & Keys', status: 'completed', tasksCount: 2, completedTasksCount: 2 },
        { id: 'p2', title: 'Phase 2: 3NF & BCNF Decomposition Tables', status: 'active', tasksCount: 2, completedTasksCount: 1 },
        { id: 'p3', title: 'Phase 3: SQL Verification & PDF Report', status: 'upcoming', tasksCount: 2, completedTasksCount: 0 },
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
      totalTasks: 5,
      completedTasks: 4,
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
      totalTasks: 4,
      completedTasks: 1,
      connectedTools: ['Brave Web Search', 'Linear Knowledge', 'Mock Sheets'],
      systemContext: 'Synthesize trade-offs between availability and consistency (CAP Theorem). Prepare 45m whiteboard architecture diagrams.',
      phases: [
        { id: 'p1', title: 'Phase 1: Storage & Consistent Hashing Fundamentals', status: 'completed', tasksCount: 3, completedTasksCount: 2 },
        { id: 'p2', title: 'Phase 2: Real-time Messaging & Pub/Sub Systems', status: 'active', tasksCount: 3, completedTasksCount: 0 },
        { id: 'p3', title: 'Phase 3: Full Mock System Design Interviews', status: 'upcoming', tasksCount: 2, completedTasksCount: 0 },
      ],
    },
  ]);

  // Selected Mission and its dedicated sub-tab
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [missionTab, setMissionTab] = useState<'overview' | 'tasks' | 'calendar' | 'docs' | 'ai'>('overview');

  // Mission Calendar Selected Date State
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(25);

  // Mission-Dedicated Tasks Mock Store
  const [missionTasks, setMissionTasks] = useState<Record<string, Task[]>>({
    'm-1': [
      { id: 'mt-1', title: 'Verify Functional Dependencies & Candidate Keys', priority: 'high', estimated_minutes: 35, status: 'completed', created_at: '2026-08-20', deadline: 'Aug 22' },
      { id: 'mt-2', title: 'Construct Minimal Cover of Dependencies', priority: 'high', estimated_minutes: 40, status: 'completed', created_at: '2026-08-22', deadline: 'Aug 24' },
      { id: 'mt-3', title: 'Decompose Schema into 3NF & Verify Lossless Join', priority: 'high', estimated_minutes: 45, status: 'todo', created_at: '2026-08-24', deadline: 'Aug 26' },
      { id: 'mt-4', title: 'Draft Final Normalization PDF Submission', priority: 'medium', estimated_minutes: 30, status: 'todo', created_at: '2026-08-25', deadline: 'Aug 28' },
    ],
    'm-2': [
      { id: 'mt-201', title: 'Implement Neumorphic Dual Light Tokens', priority: 'high', estimated_minutes: 45, status: 'completed', created_at: '2026-08-18' },
      { id: 'mt-202', title: 'Connect FastAPI Recommendation Router', priority: 'high', estimated_minutes: 30, status: 'completed', created_at: '2026-08-21' },
      { id: 'mt-203', title: 'Configure Unified Vercel Serverless Gateway', priority: 'high', estimated_minutes: 25, status: 'completed', created_at: '2026-08-24' },
      { id: 'mt-204', title: 'Final UI Polish & Responsive Testing', priority: 'high', estimated_minutes: 35, status: 'completed', created_at: '2026-08-25' },
      { id: 'mt-205', title: 'Deploy to Vercel & Production Health Check', priority: 'high', estimated_minutes: 20, status: 'todo', created_at: '2026-08-25', deadline: 'Tonight' },
    ],
    'm-3': [
      { id: 'mt-301', title: 'Review Consistent Hashing & Virtual Nodes', priority: 'high', estimated_minutes: 45, status: 'completed', created_at: '2026-08-21' },
      { id: 'mt-302', title: 'Design Distributed Rate Limiter with Redis Token Bucket', priority: 'high', estimated_minutes: 50, status: 'todo', created_at: '2026-08-24' },
      { id: 'mt-303', title: 'Study Gossip Protocol & Failure Detection', priority: 'medium', estimated_minutes: 40, status: 'todo', created_at: '2026-08-25' },
      { id: 'mt-304', title: 'Conduct Mock System Design Loop', priority: 'high', estimated_minutes: 60, status: 'todo', created_at: '2026-08-25', deadline: 'Sep 15' },
    ],
  });

  // Dedicated Mission Documents & Knowledge
  const [missionDocs, setMissionDocs] = useState<Record<string, { title: string; size: string; type: string; updated: string }[]>>({
    'm-1': [
      { title: 'DBMS_Course_Syllabus_Fall2026.pdf', size: '2.4 MB', type: 'PDF Document', updated: 'Aug 15' },
      { title: 'Relational_Schema_Design_Draft.sql', size: '18 KB', type: 'SQL Schema', updated: 'Aug 24' },
      { title: 'Normalization_Proof_Notes.md', size: '12 KB', type: 'Markdown Notes', updated: 'Aug 25' },
    ],
    'm-2': [
      { title: 'Design_System_Specification.md', size: '34 KB', type: 'Architecture Spec', updated: 'Aug 20' },
      { title: 'Vercel_Serverless_Routing_Config.json', size: '4 KB', type: 'Config', updated: 'Aug 24' },
      { title: 'QA_Checklist_and_Audit.md', size: '16 KB', type: 'Audit Log', updated: 'Aug 25' },
    ],
    'm-3': [
      { title: 'System_Design_Whiteboard_Templates.pdf', size: '4.8 MB', type: 'PDF Guide', updated: 'Aug 18' },
      { title: 'Distributed_Systems_Tradeoffs.md', size: '28 KB', type: 'Study Guide', updated: 'Aug 24' },
    ],
  });

  // Dedicated Mission Calendar Events by day (August 2026)
  const missionCalendarEvents: Record<string, Record<number, { title: string; time: string; type: 'sprint' | 'review' | 'deadline' }[]>> = {
    'm-1': {
      22: [{ title: 'Phase 1 Functional Dependencies Verification', time: '10:00 AM', type: 'review' }],
      24: [{ title: 'Minimal Cover Dependency Computation Sprint', time: '02:00 PM', type: 'sprint' }],
      25: [{ title: '3NF & BCNF Decomposition Deep Work', time: '04:45 PM', type: 'sprint' }],
      26: [{ title: 'Lossless Join Algorithm Testing', time: '11:00 AM', type: 'sprint' }],
      28: [{ title: 'Final Normalization PDF Portal Submission', time: '05:00 PM', type: 'deadline' }],
    },
    'm-2': {
      18: [{ title: 'Neumorphic Token Migration Sprint', time: '09:00 AM', type: 'sprint' }],
      21: [{ title: 'FastAPI Recommendation Testing', time: '02:30 PM', type: 'sprint' }],
      24: [{ title: 'Vercel Serverless Integration Review', time: '04:00 PM', type: 'review' }],
      25: [{ title: 'FLOW v1.0 Production Launch Sprint', time: '08:00 PM', type: 'deadline' }],
    },
    'm-3': {
      21: [{ title: 'Consistent Hashing Theory Sprint', time: '01:00 PM', type: 'sprint' }],
      24: [{ title: 'Distributed Rate Limiter Implementation', time: '06:00 PM', type: 'sprint' }],
      25: [{ title: 'Gossip Protocol Architecture Session', time: '08:00 PM', type: 'sprint' }],
      30: [{ title: 'Mock Interview Session 1: Large Scale Cache', time: '05:00 PM', type: 'review' }],
    },
  };

  // Dedicated Mission AI Chat Messages
  const [missionChat, setMissionChat] = useState<Record<string, { sender: 'user' | 'ai'; text: string }[]>>({
    'm-1': [
      { sender: 'ai', text: 'Hello! I am your dedicated DBMS Project Co-pilot. I have your relational schema, syllabus, and 3NF/BCNF decomposition requirements loaded. What would you like to execute or clarify?' },
    ],
    'm-2': [
      { sender: 'ai', text: 'FLOW v1.0 Production Workspace active. Connected to GitHub MCP and Vercel build status. All core modules and design tokens verified.' },
    ],
    'm-3': [
      { sender: 'ai', text: 'System Design Interview Hub active. Ready to simulate architectural trade-offs, capacity estimations, and distributed systems deep dives.' },
    ],
  });

  const [chatInput, setChatInput] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddMissionTaskModalOpen, setIsAddMissionTaskModalOpen] = useState(false);

  // New Mission Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Engineering');
  const [newDeadline, setNewDeadline] = useState('September 30, 2026');

  // New Mission Task Form State
  const [newMissionTaskTitle, setNewMissionTaskTitle] = useState('');
  const [newMissionTaskDuration, setNewMissionTaskDuration] = useState(30);
  const [newMissionTaskPriority, setNewMissionTaskPriority] = useState<Priority>('high');

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const missionId = `m-${Date.now()}`;
    const created: Mission = {
      id: missionId,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Dedicated project workspace with custom execution pipeline.',
      category: newCategory,
      target_deadline: newDeadline,
      status: 'active',
      progress: 0,
      totalTasks: 3,
      completedTasks: 0,
      connectedTools: ['Google Calendar MCP', 'Knowledge Graph'],
      systemContext: `Dedicated project co-pilot for ${newTitle.trim()}.`,
      phases: [
        { id: 'p1', title: 'Phase 1: Architecture & Requirements', status: 'active', tasksCount: 1, completedTasksCount: 0 },
        { id: 'p2', title: 'Phase 2: Implementation & Development', status: 'upcoming', tasksCount: 1, completedTasksCount: 0 },
        { id: 'p3', title: 'Phase 3: Delivery & Polish', status: 'upcoming', tasksCount: 1, completedTasksCount: 0 },
      ],
    };

    setMissions([created, ...missions]);
    setMissionTasks((prev) => ({
      ...prev,
      [missionId]: [
        { id: `mt-${Date.now()}`, title: `${newTitle.trim()} Initial Milestone`, priority: 'high', estimated_minutes: 45, status: 'todo', created_at: new Date().toISOString() },
      ],
    }));
    setMissionChat((prev) => ({
      ...prev,
      [missionId]: [
        { sender: 'ai', text: `Welcome to your dedicated workspace for ${newTitle.trim()}! I will help you track milestones, answer questions, and schedule focus sprints.` },
      ],
    }));

    setNewTitle('');
    setNewDesc('');
    setIsCreateModalOpen(false);
    setSelectedMission(created);
    setMissionTab('overview');
  };

  const handleToggleMissionTask = (missionId: string, taskId: string) => {
    setMissionTasks((prev) => {
      const currentList = prev[missionId] || [];
      const updated = currentList.map((t) =>
        t.id === taskId
          ? { ...t, status: (t.status === 'completed' ? 'todo' : 'completed') as Task['status'] }
          : t
      );
      
      const completedCount = updated.filter((t) => t.status === 'completed').length;
      const progress = Math.round((completedCount / updated.length) * 100);
      setMissions((mPrev) =>
        mPrev.map((m) => (m.id === missionId ? { ...m, progress, completedTasks: completedCount } : m))
      );
      if (selectedMission && selectedMission.id === missionId) {
        setSelectedMission((sPrev) => sPrev ? { ...sPrev, progress, completedTasks: completedCount } : null);
      }

      return { ...prev, [missionId]: updated };
    });
  };

  const handleAddMissionTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMission || !newMissionTaskTitle.trim()) return;

    const newTask: Task = {
      id: `mt-${Date.now()}`,
      title: newMissionTaskTitle.trim(),
      estimated_minutes: Number(newMissionTaskDuration),
      priority: newMissionTaskPriority,
      status: 'todo',
      created_at: new Date().toISOString(),
      mission_id: selectedMission.id,
    };

    setMissionTasks((prev) => ({
      ...prev,
      [selectedMission.id]: [...(prev[selectedMission.id] || []), newTask],
    }));

    onAddTask(newTask);

    setNewMissionTaskTitle('');
    setIsAddMissionTaskModalOpen(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMission || !chatInput.trim()) return;

    const currentMsg = chatInput.trim();
    const missionId = selectedMission.id;

    setMissionChat((prev) => ({
      ...prev,
      [missionId]: [...(prev[missionId] || []), { sender: 'user', text: currentMsg }],
    }));
    setChatInput('');

    setTimeout(() => {
      let aiResponse = `I've analyzed your project parameters for "${selectedMission.title}". I recommend tackling the active milestone sprint to keep downstream deadlines safe.`;
      if (currentMsg.toLowerCase().includes('task') || currentMsg.toLowerCase().includes('do')) {
        aiResponse = `For "${selectedMission.title}", your next highest priority sprint is queued. Ready to launch a focus session?`;
      }
      setMissionChat((prev) => ({
        ...prev,
        [missionId]: [...(prev[missionId] || []), { sender: 'ai', text: aiResponse }],
      }));
    }, 600);
  };

  const currentMissionTasksList = selectedMission ? missionTasks[selectedMission.id] || [] : [];
  const currentMissionDocsList = selectedMission ? missionDocs[selectedMission.id] || [] : [];
  const currentMissionChatList = selectedMission ? missionChat[selectedMission.id] || [] : [];
  const currentMissionCalendar = selectedMission ? missionCalendarEvents[selectedMission.id] || {} : {};
  const selectedDayEvents = currentMissionCalendar[selectedCalendarDay] || [];

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Top Main Header */}
      {!selectedMission ? (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
              Missions & Projects
            </h1>
            <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
              Macro-objectives with dedicated sub-flows, tasks, calendars, and AI co-pilots
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
      ) : (
        /* Selected Mission Top Bar */
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedMission(null)}
              className="p-2 rounded-xl neu-button text-flow-text-primary hover:text-flow-accent transition-colors flex items-center justify-center min-h-[38px] min-w-[38px]"
              title="Return to all missions"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="accent" size="sm">
                  {selectedMission.category.toUpperCase()}
                </Badge>
                <span className="text-[10px] text-flow-muted font-bold">
                  {selectedMission.progress}% Complete
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-flow-text-primary tracking-tight truncate max-w-xs sm:max-w-md">
                {selectedMission.title}
              </h1>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              onStartFocus({
                id: `mission-sprint-${selectedMission.id}`,
                title: `${selectedMission.title} Sprint`,
                priority: 'high',
                estimated_minutes: 45,
                status: 'todo',
                created_at: new Date().toISOString(),
              })
            }
            className="gap-1.5 font-bold shadow-md text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Sprint</span>
          </Button>
        </div>
      )}

      {/* When A Mission Is Selected -> Dedicated Sub-Workspace */}
      {selectedMission ? (
        <div className="space-y-5">
          {/* Mission Sub-Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-2xl neu-pressed">
            <button
              onClick={() => setMissionTab('overview')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                missionTab === 'overview'
                  ? 'neu-raised text-flow-accent shadow-sm'
                  : 'text-flow-text-secondary hover:text-flow-text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setMissionTab('tasks')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                missionTab === 'tasks'
                  ? 'neu-raised text-flow-accent shadow-sm'
                  : 'text-flow-text-secondary hover:text-flow-text-primary'
              }`}
            >
              Tasks ({currentMissionTasksList.length})
            </button>
            <button
              onClick={() => setMissionTab('calendar')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                missionTab === 'calendar'
                  ? 'neu-raised text-flow-accent shadow-sm'
                  : 'text-flow-text-secondary hover:text-flow-text-primary'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setMissionTab('docs')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                missionTab === 'docs'
                  ? 'neu-raised text-flow-accent shadow-sm'
                  : 'text-flow-text-secondary hover:text-flow-text-primary'
              }`}
            >
              Docs & Tools
            </button>
            <button
              onClick={() => setMissionTab('ai')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
                missionTab === 'ai'
                  ? 'neu-raised text-flow-accent shadow-sm'
                  : 'text-flow-text-secondary hover:text-flow-text-primary'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Co-Pilot</span>
            </button>
          </div>

          {/* Sub-Tab 1: Overview & Sequenced Phases */}
          {missionTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Mission Hero Card */}
              <div className="neu-card p-6 sm:p-7 border border-flow-border/80 shadow-xl space-y-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-flow-accent">
                    Dedicated Mission Pipeline
                  </span>
                  <p className="text-xs sm:text-sm text-flow-text-secondary mt-1.5 leading-relaxed font-medium">
                    {selectedMission.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-flow-muted uppercase tracking-wider">Milestone Progress</span>
                    <span className="text-flow-accent">{selectedMission.progress}% Done</span>
                  </div>
                  <div className="w-full h-2 rounded-full neu-pressed overflow-hidden">
                    <div
                      className="h-full bg-flow-accent rounded-full transition-all duration-500"
                      style={{ width: `${selectedMission.progress}%` }}
                    />
                  </div>
                </div>

                {/* Project Context Guardrails */}
                {selectedMission.systemContext && (
                  <div className="p-3.5 rounded-xl neu-pressed border border-flow-border/40 space-y-1 text-xs">
                    <span className="font-bold text-flow-text-primary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-flow-accent" />
                      Project Guardrails & Scope
                    </span>
                    <p className="text-flow-text-secondary font-medium">
                      {selectedMission.systemContext}
                    </p>
                  </div>
                )}
              </div>

              {/* Sequenced Phases */}
              <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-flow-muted">
                  Milestone Phase Sequence
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
            </motion.div>
          )}

          {/* Sub-Tab 2: Mission-Dedicated To-Do Matrix */}
          {missionTab === 'tasks' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-flow-muted uppercase tracking-wider">
                  Mission Task Stream ({currentMissionTasksList.length})
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAddMissionTaskModalOpen(true)}
                  className="gap-1 font-bold text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Mission Task</span>
                </Button>
              </div>

              <div className="space-y-2.5">
                {currentMissionTasksList.map((task) => {
                  const isCompleted = task.status === 'completed';
                  return (
                    <div
                      key={task.id}
                      className={`neu-card p-4 flex items-center justify-between gap-3 border border-flow-border/80 ${
                        isCompleted ? 'opacity-55' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={() => handleToggleMissionTask(selectedMission.id, task.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'neu-raised text-transparent hover:text-flow-muted'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <div className="min-w-0">
                          <span
                            className={`text-xs sm:text-sm font-bold text-flow-text-primary block truncate ${
                              isCompleted ? 'line-through text-flow-muted' : ''
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="text-[10px] text-flow-muted">
                            {task.estimated_minutes} min sprint • {task.priority.toUpperCase()} priority
                          </span>
                        </div>
                      </div>

                      <Badge
                        variant={isCompleted ? 'success' : task.priority === 'high' ? 'danger' : 'neutral'}
                        size="sm"
                      >
                        {isCompleted ? 'Done' : `${task.estimated_minutes}m`}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Sub-Tab 3: Mission-Dedicated Interactive Calendar Grid */}
          {missionTab === 'calendar' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Mission Calendar Month Grid */}
              <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-flow-border/60">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-flow-accent" />
                    <h3 className="text-sm font-black text-flow-text-primary">
                      {selectedMission.title} • August 2026 Schedule
                    </h3>
                  </div>
                  <Badge variant="accent" size="sm">
                    Target: {selectedMission.target_deadline}
                  </Badge>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d} className="text-[10px] font-black uppercase text-flow-muted">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Days Grid (August 2026: 31 days, offset 6) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`m-offset-${i}`} className="h-9 sm:h-11 opacity-0 pointer-events-none" />
                  ))}

                  {Array.from({ length: 31 }).map((_, i) => {
                    const dayNum = i + 1;
                    const isSelected = selectedCalendarDay === dayNum;
                    const hasEvents = !!currentMissionCalendar[dayNum];
                    const isToday = dayNum === 25;

                    return (
                      <button
                        key={`m-day-${dayNum}`}
                        onClick={() => setSelectedCalendarDay(dayNum)}
                        className={`h-9 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'neu-pressed border border-flow-accent/60 bg-flow-accent/10 font-black text-flow-accent shadow-inner'
                            : isToday
                            ? 'neu-raised border border-flow-accent/40 font-black text-flow-accent'
                            : 'neu-raised hover:scale-[1.03]'
                        }`}
                      >
                        <span className="text-xs font-bold">{dayNum}</span>
                        {hasEvents && (
                          <div className="w-1.5 h-1.5 rounded-full bg-flow-accent mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Day Inspector for Selected Date in Mission */}
              <div className="neu-card p-4 sm:p-5 border border-flow-border/80 shadow-xl">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-flow-border/60">
                  <span className="text-xs font-bold text-flow-text-primary">
                    August {selectedCalendarDay}, 2026 • Project Events
                  </span>
                  <span className="text-[10px] text-flow-muted font-semibold">
                    {selectedDayEvents.length} items scheduled
                  </span>
                </div>

                {selectedDayEvents.length === 0 ? (
                  <div className="py-6 text-center neu-pressed rounded-xl text-xs text-flow-muted">
                    No dedicated project sprints scheduled on August {selectedCalendarDay}.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedDayEvents.map((evt, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl neu-raised flex items-center justify-between gap-3 border border-flow-border/60"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-flow-accent w-16 shrink-0">{evt.time}</span>
                          <span className="text-xs font-bold text-flow-text-primary">{evt.title}</span>
                        </div>
                        <Badge
                          variant={evt.type === 'deadline' ? 'danger' : evt.type === 'review' ? 'warning' : 'accent'}
                          size="sm"
                          className="text-[10px]"
                        >
                          {evt.type.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Sub-Tab 4: Mission Documents & Connected MCP Tools */}
          {missionTab === 'docs' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-flow-border/60">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-flow-accent" />
                    <h3 className="text-xs sm:text-sm font-bold text-flow-text-primary">
                      Connected Project Documents & Knowledge
                    </h3>
                  </div>
                  <span className="text-[10px] text-flow-muted font-bold">
                    {currentMissionDocsList.length} files attached
                  </span>
                </div>

                <div className="space-y-2.5">
                  {currentMissionDocsList.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl neu-raised flex items-center justify-between gap-3 border border-flow-border/60 hover:scale-[1.01] transition-transform"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center text-flow-accent shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-flow-text-primary block truncate">
                            {doc.title}
                          </span>
                          <span className="text-[10px] text-flow-muted">
                            {doc.type} • {doc.size} • Updated {doc.updated}
                          </span>
                        </div>
                      </div>

                      <Badge variant="neutral" size="sm">
                        Attached
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected MCP Tools */}
              <div className="neu-card p-5 border border-flow-border/80 shadow-xl space-y-3">
                <span className="text-xs font-bold text-flow-muted uppercase tracking-wider block">
                  Connected MCP Tools for this Mission
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedMission.connectedTools.map((t, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl neu-pressed text-xs font-bold text-flow-text-primary flex items-center gap-2"
                    >
                      <Cpu className="w-3.5 h-3.5 text-flow-accent" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Sub-Tab 5: Mission-Dedicated AI Co-Pilot */}
          {missionTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-flow-border/60">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-flow-accent" />
                  <h3 className="text-xs sm:text-sm font-bold text-flow-text-primary">
                    {selectedMission.title} AI Assistant
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-flow-accent uppercase">
                  Scoped Context Loaded
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {currentMissionChatList.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                        msg.sender === 'user'
                          ? 'neu-button-accent text-white shadow-md'
                          : 'neu-pressed text-flow-text-primary border border-flow-border/60'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-flow-border/50">
                <input
                  type="text"
                  placeholder={`Ask questions about ${selectedMission.title}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 rounded-xl p-3 text-xs neu-input"
                />
                <Button type="submit" variant="primary" size="sm" className="px-4">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      ) : (
        /* Missions Overview Grid */
        <div className="space-y-4">
          {missions.map((m) => (
            <motion.div
              layout
              key={m.id}
              onClick={() => {
                setSelectedMission(m);
                setMissionTab('overview');
              }}
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
                  <CalendarIcon className="w-3.5 h-3.5 text-flow-accent" />
                  Target: {m.target_deadline}
                </span>
                <span>{m.phases.length} Execution Phases</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create New Mission Modal */}
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

      {/* Add Task Within Dedicated Mission Modal */}
      <Modal
        isOpen={isAddMissionTaskModalOpen}
        onClose={() => setIsAddMissionTaskModalOpen(false)}
        title={selectedMission ? `Add Task to ${selectedMission.title}` : 'Add Mission Task'}
      >
        <form onSubmit={handleAddMissionTask} className="space-y-4">
          <Input
            label="Task Objective"
            placeholder="e.g. Implement BCNF Decomposition Verification"
            value={newMissionTaskTitle}
            onChange={(e) => setNewMissionTaskTitle(e.target.value)}
            required
            autoFocus
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
                Duration (Mins)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                step="5"
                className="rounded-2xl p-3 text-sm neu-input font-bold"
                value={newMissionTaskDuration}
                onChange={(e) => setNewMissionTaskDuration(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-flow-text-secondary">
                Priority
              </label>
              <select
                className="rounded-2xl p-3 text-sm neu-input bg-transparent font-bold"
                value={newMissionTaskPriority}
                onChange={(e) => setNewMissionTaskPriority(e.target.value as Priority)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={() => setIsAddMissionTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="flex-1 font-bold">
              Save Mission Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
