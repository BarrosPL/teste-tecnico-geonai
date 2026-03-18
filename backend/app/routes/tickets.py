from datetime import timedelta,timezone

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Ticket, PriorityEnum
from app.schemas import TicketCreate, TicketResponse

router = APIRouter(prefix="/tickets", tags=["Tickets"])


def serialize_ticket(ticket: Ticket) -> TicketResponse:
    prazo_resolucao = None

    if ticket.priority == PriorityEnum.ALTA:
        prazo_resolucao = ticket.created_at + timedelta(hours=4)

    return TicketResponse(
        id=ticket.id,
        title=ticket.title,
        description=ticket.description,
        priority=ticket.priority,
        status=ticket.status,
        created_at=ticket.created_at,
        prazo_resolucao=prazo_resolucao,
    )


@router.post("", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(payload: TicketCreate, db: Session = Depends(get_db)):
    ticket = Ticket(
        title=payload.title,
        description=payload.description,
        priority=payload.priority,
        status=payload.status,
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return serialize_ticket(ticket)


@router.get("", response_model=list[TicketResponse])
def list_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).order_by(Ticket.created_at.desc()).all()
    return [serialize_ticket(ticket) for ticket in tickets]