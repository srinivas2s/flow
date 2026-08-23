import threading
from typing import List, Optional, Dict
from datetime import datetime
from app.models.schemas import TaskResponse, PlanItemResponse, MemoryResponse, FocusSessionResponse

class DataStore:
    def __init__(self):
        self._lock = threading.Lock()
        
        self.tasks: Dict[str, dict] = {
            't-1': {
                'id': 't-1',
                'title': 'Finish DBMS assignment (Normalization)',
                'description': 'Complete 3NF, BCNF relational schema definitions and submit assignment PDF.',
                'deadline': 'Tomorrow, 5:00 PM',
                'priority': 'high',
                'estimated_minutes': 35,
                'status': 'in_progress',
                'category': 'Academic',
                'completed_at': None,
                'created_at': datetime.now().isoformat(),
            },
            't-2': {
                'id': 't-2',
                'title': 'Review System Architecture PR',
                'description': 'Check FastAPI routers and Next.js client integration endpoints.',
                'deadline': 'Today, 7:00 PM',
                'priority': 'medium',
                'estimated_minutes': 25,
                'status': 'todo',
                'category': 'Engineering',
                'completed_at': None,
                'created_at': datetime.now().isoformat(),
            },
            't-3': {
                'id': 't-3',
                'title': 'Prepare Hackathon Pitch Slides',
                'description': 'Refine problem-to-solution narrative for 3-minute jury presentation.',
                'deadline': 'Friday, 12:00 PM',
                'priority': 'high',
                'estimated_minutes': 45,
                'status': 'todo',
                'category': 'Competition',
                'completed_at': None,
                'created_at': datetime.now().isoformat(),
            },
            't-4': {
                'id': 't-4',
                'title': 'Buy Groceries & Protein essentials',
                'description': 'Weekly grocery run before evening cooking session.',
                'deadline': 'Today, 8:30 PM',
                'priority': 'low',
                'estimated_minutes': 20,
                'status': 'todo',
                'category': 'Personal',
                'completed_at': None,
                'created_at': datetime.now().isoformat(),
            },
            't-5': {
                'id': 't-5',
                'title': 'Set up Next.js 15 Tailwind Design Tokens',
                'description': 'Completed foundational neumorphic styling variables.',
                'deadline': 'Completed',
                'priority': 'high',
                'estimated_minutes': 40,
                'status': 'completed',
                'category': 'Engineering',
                'completed_at': datetime.now().isoformat(),
                'created_at': datetime.now().isoformat(),
            },
        }

        self.plan: List[dict] = [
            {
                'id': 'p-1',
                'task_id': 't-class',
                'title': 'Computer Systems & Architecture Lecture',
                'start_time': '09:00 AM',
                'end_time': '10:30 AM',
                'duration_minutes': 90,
                'status': 'completed',
                'type': 'meeting',
                'reason': 'Fixed academic class schedule',
            },
            {
                'id': 'p-2',
                'task_id': 't-deep',
                'title': 'Deep Work Sprint: Core Engine',
                'start_time': '11:00 AM',
                'end_time': '12:30 PM',
                'duration_minutes': 90,
                'status': 'completed',
                'type': 'deep_work',
                'reason': 'Peak morning cognitive energy window',
            },
            {
                'id': 'p-3',
                'task_id': 't-break',
                'title': 'Lunch & Mindful Walk',
                'start_time': '12:30 PM',
                'end_time': '01:30 PM',
                'duration_minutes': 60,
                'status': 'completed',
                'type': 'break',
                'reason': 'Essential recovery block',
            },
            {
                'id': 'p-4',
                'task_id': 't-1',
                'title': 'Finish DBMS assignment (Normalization)',
                'start_time': '02:00 PM',
                'end_time': '02:45 PM',
                'duration_minutes': 45,
                'status': 'active',
                'type': 'task',
                'reason': 'High priority with upcoming tomorrow deadline',
            },
            {
                'id': 'p-5',
                'task_id': 't-2',
                'title': 'Review System Architecture PR',
                'start_time': '03:15 PM',
                'end_time': '03:45 PM',
                'duration_minutes': 30,
                'status': 'scheduled',
                'type': 'task',
                'reason': '30m slot before evening team meeting',
            },
            {
                'id': 'p-6',
                'task_id': 't-sync',
                'title': 'Engineering Team Sync & Demo',
                'start_time': '06:00 PM',
                'end_time': '06:45 PM',
                'duration_minutes': 45,
                'status': 'scheduled',
                'type': 'meeting',
                'reason': 'Daily team alignment',
            },
        ]

        self.memories: List[dict] = [
            {
                'id': 'm-1',
                'title': 'Backend Architecture',
                'content': 'Use FastAPI for backend service layer with strict Pydantic schemas.',
                'category': 'decision',
                'created_at': '2026-08-18',
                'confidence': 0.95,
            },
            {
                'id': 'm-2',
                'title': 'Project Context',
                'content': 'Hackathon presentation scheduled for Friday. Needs 3-minute deck.',
                'category': 'context',
                'created_at': '2026-08-20',
                'confidence': 0.92,
            },
            {
                'id': 'm-3',
                'title': 'Work Sprint Preferences',
                'content': 'Deep work usually works best in the evening and late mornings.',
                'category': 'preference',
                'created_at': '2026-08-22',
                'confidence': 0.88,
            },
            {
                'id': 'm-4',
                'title': 'Break Cadence Habit',
                'content': 'Requires a 10-15 minute walk after 45+ minute intensive focus sessions.',
                'category': 'habit',
                'created_at': '2026-08-24',
                'confidence': 0.91,
            },
        ]

        self.sessions: Dict[str, dict] = {}

    def get_all_tasks(self) -> List[dict]:
        with self._lock:
            return list(self.tasks.values())

    def get_task(self, task_id: str) -> Optional[dict]:
        with self._lock:
            return self.tasks.get(task_id)

    def add_task(self, task_data: dict) -> dict:
        with self._lock:
            task_id = f"t-{int(datetime.now().timestamp() * 1000)}"
            new_task = {
                'id': task_id,
                'title': task_data.get('title', 'Untitled Task'),
                'description': task_data.get('description'),
                'deadline': task_data.get('deadline', 'Upcoming'),
                'priority': task_data.get('priority', 'medium'),
                'estimated_minutes': task_data.get('estimated_minutes', 30),
                'status': 'todo',
                'category': task_data.get('category', 'General'),
                'completed_at': None,
                'created_at': datetime.now().isoformat(),
            }
            self.tasks[task_id] = new_task
            return new_task

    def update_task(self, task_id: str, updates: dict) -> Optional[dict]:
        with self._lock:
            if task_id not in self.tasks:
                return None
            task = self.tasks[task_id]
            for key, val in updates.items():
                if val is not None:
                    task[key] = val
            if updates.get('status') == 'completed' and not task.get('completed_at'):
                task['completed_at'] = datetime.now().isoformat()
            return task

    def delete_task(self, task_id: str) -> bool:
        with self._lock:
            if task_id in self.tasks:
                del self.tasks[task_id]
                return True
            return False

    def get_plan(self) -> List[dict]:
        with self._lock:
            return list(self.plan)

    def recalculate_plan(self, delay_minutes: int = 30) -> List[dict]:
        with self._lock:
            updated = []
            for item in self.plan:
                if item['id'] == 'p-4':
                    updated.append({**item, 'start_time': '02:30 PM', 'end_time': '03:10 PM', 'duration_minutes': 40})
                elif item['id'] == 'p-5':
                    updated.append({**item, 'start_time': '03:30 PM', 'end_time': '04:00 PM'})
                else:
                    updated.append(item)
            self.plan = updated
            return list(self.plan)

    def get_memories(self) -> List[dict]:
        with self._lock:
            return list(self.memories)

    def add_memory(self, memory_data: dict) -> dict:
        with self._lock:
            mem_id = f"m-{int(datetime.now().timestamp() * 1000)}"
            new_mem = {
                'id': mem_id,
                'title': memory_data['title'],
                'content': memory_data['content'],
                'category': memory_data.get('category', 'context'),
                'created_at': datetime.now().strftime('%Y-%m-%d'),
                'confidence': memory_data.get('confidence', 0.9),
            }
            self.memories.append(new_mem)
            return new_mem

    def start_focus_session(self, task_id: str, duration_minutes: int) -> dict:
        with self._lock:
            session_id = f"s-{int(datetime.now().timestamp() * 1000)}"
            task = self.tasks.get(task_id, {})
            session = {
                'id': session_id,
                'task_id': task_id,
                'task_title': task.get('title', 'Focus Session'),
                'duration_minutes': duration_minutes,
                'started_at': datetime.now().isoformat(),
                'completed_at': None,
                'status': 'active',
            }
            self.sessions[session_id] = session
            return session

    def complete_focus_session(self, session_id: str, actual_minutes: Optional[int] = None) -> Optional[dict]:
        with self._lock:
            if session_id not in self.sessions:
                return None
            session = self.sessions[session_id]
            session['completed_at'] = datetime.now().isoformat()
            session['status'] = 'completed'
            if actual_minutes:
                session['duration_minutes'] = actual_minutes
            return session

db = DataStore()
