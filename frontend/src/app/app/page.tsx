'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Task, PlanItem, Memory, AIRecommendation } from '@/types';
import { apiClient, calculateLocalRecommendation, INITIAL_TASKS, INITIAL_PLAN, INITIAL_MEMORIES } from '@/lib/api';
import { Header } from '@/components/app/Header';
import { BottomNav, TabType } from '@/components/app/BottomNav';
import { SideNavDrawer, AppViewType } from '@/components/app/SideNavDrawer';
import { HomeView } from '@/components/app/HomeView';
import { TaskListView } from '@/components/app/TaskListView';
import { CalendarView } from '@/components/app/CalendarView';
import { MCPOrchestratorView } from '@/components/app/MCPOrchestratorView';
import { DocumentIngestView } from '@/components/app/DocumentIngestView';
import { EmailSyncView } from '@/components/app/EmailSyncView';
import { PlanTimelineView } from '@/components/app/PlanTimelineView';
import { BrainView } from '@/components/app/BrainView';
import { AIAssistantDrawer } from '@/components/app/AIAssistantDrawer';
import { FocusModeOverlay } from '@/components/app/FocusModeOverlay';
import { Suspense } from 'react';

function AppShellContent() {
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState<AppViewType>('home');
  
  // State
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [plan, setPlan] = useState<PlanItem[]>(INITIAL_PLAN);
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  // Modals & Overlays
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [activeFocusTask, setActiveFocusTask] = useState<Task | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Initial load
  useEffect(() => {
    async function loadData() {
      const [fetchedTasks, fetchedPlan, fetchedMemories] = await Promise.all([
        apiClient.getTasks(),
        apiClient.getPlan(),
        apiClient.getMemories(),
      ]);
      setTasks(fetchedTasks);
      setPlan(fetchedPlan);
      setMemories(fetchedMemories);
      setRecommendation(calculateLocalRecommendation(fetchedTasks));
    }
    loadData();

    // Check if query param asked to start focus directly
    if (searchParams.get('action') === 'focus') {
      const target = tasks.find((t) => t.id === 't-1') || tasks[0];
      setActiveFocusTask(target);
      setIsFocusOpen(true);
    }
  }, [searchParams]);

  // Handlers
  const handleStartFocus = (task?: Task) => {
    const target = task || recommendation?.task || tasks[0];
    setActiveFocusTask(target);
    setIsFocusOpen(true);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: (t.status === 'completed' ? 'todo' : 'completed') as Task['status'],
              completed_at: t.status === 'completed' ? undefined : new Date().toISOString(),
            }
          : t
      );
      setRecommendation(calculateLocalRecommendation(updated));
      return updated;
    });
  };

  const handleAddTask = async (taskData: Partial<Task>) => {
    const newTask = await apiClient.createTask(taskData);
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      setRecommendation(calculateLocalRecommendation(updated));
      return updated;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      setRecommendation(calculateLocalRecommendation(updated));
      return updated;
    });
  };

  const handleRecalculatePlan = async () => {
    setIsRecalculating(true);
    const updatedPlan = await apiClient.recalculatePlan();
    setPlan(updatedPlan);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 600);
  };

  const handleCompleteFocusTask = (taskId: string) => {
    handleToggleTask(taskId);
    handleRecalculatePlan();
  };

  const handleImportExtractedTasks = (extractedList: { title: string; deadline: string; duration: number; priority: 'high' | 'medium' | 'low' }[]) => {
    extractedList.forEach((t) => {
      handleAddTask({
        title: t.title,
        deadline: t.deadline,
        estimated_minutes: t.duration,
        priority: t.priority,
        status: 'todo',
      });
    });
    setActiveView('tasks');
  };

  const handleScheduleEmailTask = (title: string, deadline: string) => {
    handleAddTask({
      title,
      deadline,
      estimated_minutes: 45,
      priority: 'high',
      status: 'todo',
    });
    setActiveView('plan');
  };

  const viewTitles: Record<AppViewType, string> = {
    home: 'Today & Next Move',
    tasks: 'Tasks Matrix',
    calendar: 'Calendar & Day Inspector',
    mcp: 'AI MCP Orchestrator',
    docs: 'Document Task Ingest',
    email: 'Email Schedule Sync',
    plan: 'Daily Sequence Plan',
    brain: 'Brain Knowledge Graph',
  };

  // Convert AppViewType to TabType for BottomNav
  const getBottomNavTab = (v: AppViewType): TabType => {
    if (v === 'tasks') return 'tasks';
    if (v === 'plan') return 'plan';
    if (v === 'brain') return 'brain';
    return 'home';
  };

  return (
    <div className="min-h-screen text-flow-text-primary flex flex-col selection:bg-flow-accent/20">
      {/* Top Header */}
      <Header
        onOpenAI={() => setIsAIOpen(true)}
        onOpenMenu={() => setIsSideMenuOpen(true)}
        currentViewTitle={viewTitles[activeView]}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20">
        {activeView === 'home' && (
          <HomeView
            tasks={tasks}
            plan={plan}
            recommendation={recommendation}
            onStartFocus={handleStartFocus}
            onNavigateTab={(tab) => setActiveView(tab)}
            onOpenAI={() => setIsAIOpen(true)}
          />
        )}

        {activeView === 'tasks' && (
          <TaskListView
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onStartFocus={handleStartFocus}
          />
        )}

        {activeView === 'calendar' && (
          <CalendarView
            tasks={tasks}
            plan={plan}
            onStartFocus={handleStartFocus}
            onAddTask={handleAddTask}
          />
        )}

        {activeView === 'mcp' && (
          <MCPOrchestratorView />
        )}

        {activeView === 'docs' && (
          <DocumentIngestView onImportTasks={handleImportExtractedTasks} />
        )}

        {activeView === 'email' && (
          <EmailSyncView onScheduleEmailTask={handleScheduleEmailTask} />
        )}

        {activeView === 'plan' && (
          <PlanTimelineView
            plan={plan}
            onRecalculate={handleRecalculatePlan}
            isRecalculating={isRecalculating}
          />
        )}

        {activeView === 'brain' && (
          <BrainView
            memories={memories}
          />
        )}
      </main>

      {/* Side Navigation Drawer */}
      <SideNavDrawer
        isOpen={isSideMenuOpen}
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
        onClose={() => setIsSideMenuOpen(false)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={getBottomNavTab(activeView)}
        onTabChange={(tab) => setActiveView(tab)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onStartFocus={handleStartFocus}
        onRecalculatePlan={handleRecalculatePlan}
        onAddTask={handleAddTask}
      />

      {/* Focus Mode Overlay */}
      <FocusModeOverlay
        isOpen={isFocusOpen}
        task={activeFocusTask}
        onClose={() => setIsFocusOpen(false)}
        onCompleteTask={handleCompleteFocusTask}
      />
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AppShellContent />
    </Suspense>
  );
}
