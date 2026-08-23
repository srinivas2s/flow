from fastapi import APIRouter
from app.models.schemas import AIRecommendationResponse
from app.services.recommendation import engine

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/recommend", response_model=AIRecommendationResponse)
async def get_next_move_recommendation():
    return engine.get_next_move(available_minutes=45)
