from fastapi import APIRouter
from typing import List
from app.models.schemas import PlanItemResponse, PlanRecalculateRequest
from app.services.store import db

router = APIRouter(prefix="/plan", tags=["Plan"])

@router.get("", response_model=List[PlanItemResponse])
async def get_plan():
    return db.get_plan()

@router.post("/recalculate", response_model=List[PlanItemResponse])
async def recalculate_plan(req: PlanRecalculateRequest = PlanRecalculateRequest()):
    updated = db.recalculate_plan(delay_minutes=req.delay_minutes or 30)
    return updated
