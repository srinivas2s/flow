import { Task, PlanItem, Memory, FocusSession, AIRecommendation } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

// Initial sample seed data for instant, reliable fallback
export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Finish DBMS assignment (Normalization)',
    description: 'Complete 3NF, BCNF relational schema definitions and submit assignment PDF.',
    deadline: 'Tomorrow, 5:00 PM',
    priority: 'high',
    estimated_minutes: 35,
    status: 'in_progress',
    category: 'Academic',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-2',
    title: 'Review System Architecture PR',
    description: 'Check FastAPI routers and Next.js client integration endpoints.',
    deadline: 'Today, 7:00 PM',
    priority: 'medium',
    estimated_minutes: 25,
    status: 'todo',
    category: 'Engineering',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-3',
    title: 'Prepare Hackathon Pitch Slides',
    description: 'Refine problem-to-solution narrative for 3-minute jury presentation.',
    deadline: 'Friday, 12:00 PM',
    priority: 'high',
    estimated_minutes: 45,
    status: 'todo',
    category: 'Competition',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-4',
    title: 'Buy Groceries & Protein essentials',
    description: 'Weekly grocery run before evening cooking session.',
    deadline: 'Today, 8:30 PM',
    priority: 'low',
    estimated_minutes: 20,
    status: 'todo',
    category: 'Personal',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-5',
    title: 'Set up Next.js 15 Tailwind Design Tokens',
    description: 'Completed foundational neumorphic styling variables.',
    deadline: 'Completed',
    priority: 'high',
    estimated_minutes: 40,
    status: 'completed',
    category: 'Engineering',
    completed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_PLAN: PlanItem[] = [
  {
    id: 'p-1',
    task_id: 't-class',
    title: 'Computer Systems & Architecture Lecture',
    start_time: '09:00 AM',
    end_time: '10:30 AM',
    duration_minutes: 90,
    status: 'completed',
    type: 'meeting',
    reason: 'Fixed academic class schedule',
  },
  {
    id: 'p-2',
    task_id: 't-deep',
    title: 'Deep Work Sprint: Core Engine',
    start_time: '11:00 AM',
    end_time: '12:30 PM',
    duration_minutes: 90,
    status: 'completed',
    type: 'deep_work',
    reason: 'Peak morning cognitive energy window',
  },
  {
    id: 'p-3',
    task_id: 't-break',
    title: 'Lunch & Mindful Walk',
    start_time: '12:30 PM',
    end_time: '01:30 PM',
    duration_minutes: 60,
    status: 'completed',
    type: 'break',
    reason: 'Essential recovery block',
  },
  {
    id: 'p-4',
    task_id: 't-1',
    title: 'Finish DBMS assignment (Normalization)',
    start_time: '02:00 PM',
    end_time: '02:45 PM',
    duration_minutes: 45,
    status: 'active',
    type: 'task',
    reason: 'High priority with upcoming tomorrow deadline',
  },
  {
    id: 'p-5',
    task_id: 't-2',
    title: 'Review System Architecture PR',
    start_time: '03:15 PM',
    end_time: '03:45 PM',
    duration_minutes: 30,
    status: 'scheduled',
    type: 'task',
    reason: '30m slot before evening team meeting',
  },
  {
    id: 'p-6',
    task_id: 't-sync',
    title: 'Engineering Team Sync & Demo',
    start_time: '06:00 PM',
    end_time: '06:45 PM',
    duration_minutes: 45,
    status: 'scheduled',
    type: 'meeting',
    reason: 'Daily team alignment',
  },
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'm-1',
    title: 'Backend Architecture',
    content: 'Use FastAPI for backend service layer with strict Pydantic schemas.',
    category: 'decision',
    created_at: '2026-08-18',
    confidence: 0.95,
  },
  {
    id: 'm-2',
    title: 'Project Context',
    content: 'Hackathon presentation scheduled for Friday. Needs 3-minute deck.',
    category: 'context',
    created_at: '2026-08-20',
    confidence: 0.92,
  },
  {
    id: 'm-3',
    title: 'Work Sprint Preferences',
    content: 'Deep work usually works best in the evening and late mornings.',
    category: 'preference',
    created_at: '2026-08-22',
    confidence: 0.88,
  },
  {
    id: 'm-4',
    title: 'Break Cadence Habit',
    content: 'Requires a 10-15 minute walk after 45+ minute intensive focus sessions.',
    category: 'habit',
    created_at: '2026-08-24',
    confidence: 0.91,
  },
];

// Helper to compute local AI recommendation
export function calculateLocalRecommendation(tasks: Task[]): AIRecommendation {
  const pending = tasks.filter((t) => t.status !== 'completed');
  const topTask = pending.find((t) => t.id === 't-1') || pending[0] || INITIAL_TASKS[0];

  return {
    task: topTask,
    reason: 'You have 45 minutes available before your 6:00 PM sync. Your DBMS assignment is due tomorrow and requires 35 mins.',
    available_time_minutes: 45,
    next_commitment: '6:00 PM Engineering Sync',
    confidence_score: 0.96,
    suggested_break_after: true,
  };
}

// API Client Methods with automatic fallback to local memory
export const apiClient = {
  async getTasks(): Promise<Task[]> {
    try {
      const res = await fetch(`${API_BASE}/tasks`, { cache: 'no-store' });
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return INITIAL_TASKS;
    }
  },

  async createTask(task: Partial<Task>): Promise<Task> {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('API create failed');
      return await res.json();
    } catch {
      const newTask: Task = {
        id: `t-${Date.now()}`,
        title: task.title || 'Untitled Task',
        description: task.description || '',
        deadline: task.deadline || 'Upcoming',
        priority: task.priority || 'medium',
        estimated_minutes: task.estimated_minutes || 30,
        status: 'todo',
        category: task.category || 'General',
        created_at: new Date().toISOString(),
      };
      return newTask;
    }
  },

  async getPlan(): Promise<PlanItem[]> {
    try {
      const res = await fetch(`${API_BASE}/plan`, { cache: 'no-store' });
      if (!res.ok) throw new Error('API plan failed');
      return await res.json();
    } catch {
      return INITIAL_PLAN;
    }
  },

  async recalculatePlan(disruptedTaskId?: string): Promise<PlanItem[]> {
    try {
      const res = await fetch(`${API_BASE}/plan/recalculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disrupted_task_id: disruptedTaskId }),
      });
      if (!res.ok) throw new Error('API recalculate failed');
      return await res.json();
    } catch {
      return INITIAL_PLAN.map((item) => {
        if (item.id === 'p-4') {
          return { ...item, start_time: '02:30 PM', end_time: '03:10 PM', duration_minutes: 40 };
        }
        if (item.id === 'p-5') {
          return { ...item, start_time: '03:30 PM', end_time: '04:00 PM' };
        }
        return item;
      });
    }
  },

  async getRecommendation(): Promise<AIRecommendation> {
    try {
      const res = await fetch(`${API_BASE}/ai/recommend`, { method: 'POST' });
      if (!res.ok) throw new Error('API recommend failed');
      return await res.json();
    } catch {
      return calculateLocalRecommendation(INITIAL_TASKS);
    }
  },

  async getMemories(): Promise<Memory[]> {
    try {
      const res = await fetch(`${API_BASE}/memories`, { cache: 'no-store' });
      if (!res.ok) throw new Error('API memories failed');
      return await res.json();
    } catch {
      return INITIAL_MEMORIES;
    }
  },
};
