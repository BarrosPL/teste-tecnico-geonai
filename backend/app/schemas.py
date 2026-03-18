from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from app.models import PriorityEnum, StatusEnum


class TicketCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=120)
    description: str = Field(..., min_length=5, max_length=1000)
    priority: PriorityEnum
    status: StatusEnum = StatusEnum.ABERTO

class TicketUpdate(BaseModel):
    title: str = Field(..., min_length=3, max_length=120)
    description: str = Field(..., min_length=5, max_length=1000)
    priority: PriorityEnum
    status: StatusEnum


class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: PriorityEnum
    status: StatusEnum
    created_at: datetime
    prazo_resolucao: Optional[datetime] = None

    class Config:
        from_attributes = True