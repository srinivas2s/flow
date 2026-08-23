from typing import Optional, List
from app.services.store import db
from app.models.schemas import AIRecommendationResponse, TaskResponse

class RecommendationEngine:
    @staticmethod
    def get_next_move(available_minutes: int = 45) -> AIRecommendationResponse:
        tasks = db.get_all_tasks()
        pending_tasks = [t for t in tasks if t.get('status') != 'completed']
        
        # Sort criteria: 1) High priority first, 2) Near deadline, 3) Fits within available time
        def priority_score(t: dict) -> int:
            score = 0
            if t.get('priority') == 'high':
                score += 100
            elif t.get('priority') == 'medium':
                score += 50
            
            # Deadline weight
            deadline = (t.get('deadline') or '').lower()
            if 'today' in deadline or 'tomorrow' in deadline:
                score += 80
            elif 'friday' in deadline:
                score += 40

            # Duration fitting weight
            duration = t.get('estimated_minutes', 30)
            if duration <= available_minutes:
                score += 30
            else:
                score -= 20

            return score

        if pending_tasks:
            sorted_tasks = sorted(pending_tasks, key=priority_score, reverse=True)
            chosen_task = sorted_tasks[0]
        else:
            # Fallback to any task
            chosen_task = tasks[0]

        reason = (
            f"You have {available_minutes} minutes available before your 6:00 PM team sync. "
            f"Completing this {chosen_task.get('estimated_minutes', 35)}m task satisfies your highest-impact commitment today."
        )

        return AIRecommendationResponse(
            task=TaskResponse(**chosen_task),
            reason=reason,
            available_time_minutes=available_minutes,
            next_commitment="6:00 PM Engineering Team Sync",
            confidence_score=0.96,
            suggested_break_after=True,
        )

engine = RecommendationEngine()
