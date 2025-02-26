import uuid
from typing import Any

from fastapi import APIRouter, HTTPException

from src.auth.services import CurrentUser, SessionDep

from . import services
from .exceptions import AIGenerationError, EmptyCollectionError
from .schemas import (
    AIFlashcardsRequest,
    Card,
    CardCreate,
    CardList,
    CardUpdate,
    Collection,
    CollectionCreate,
    CollectionList,
    CollectionUpdate,
    PracticeCardResponse,
    PracticeSession,
    PracticeSessionList,
)

router = APIRouter()


@router.get("/collections/", response_model=CollectionList)
def read_collections(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    collections, count = services.get_collections(
        session=session, user_id=current_user.id, skip=skip, limit=limit
    )
    return CollectionList(data=collections, count=count)


@router.post("/collections/", response_model=Collection)
def create_collection(
    session: SessionDep, current_user: CurrentUser, collection_in: CollectionCreate
) -> Any:
    return services.create_collection(
        session=session, collection_in=collection_in, user_id=current_user.id
    )


@router.post("/collections/ai", response_model=Collection)
async def create_ai_collection(
    session: SessionDep,
    current_user: CurrentUser,
    request: AIFlashcardsRequest,
) -> Any:
    try:
        collection = await services.generate_ai_collection(
            session=session,
            user_id=current_user.id,
            prompt=request.prompt,
        )
        return collection
    except AIGenerationError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/collections/{collection_id}", response_model=Collection)
def read_collection(
    session: SessionDep, current_user: CurrentUser, collection_id: uuid.UUID
) -> Any:
    collection = services.get_collection(
        session=session, id=collection_id, user_id=current_user.id
    )
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection


@router.put("/collections/{collection_id}", response_model=Collection)
def update_collection(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
    collection_in: CollectionUpdate,
) -> Any:
    collection = services.get_collection(
        session=session, id=collection_id, user_id=current_user.id
    )
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    return services.update_collection(
        session=session, collection=collection, collection_in=collection_in
    )


@router.delete("/collections/{collection_id}", status_code=204)
def delete_collection(
    session: SessionDep, current_user: CurrentUser, collection_id: uuid.UUID
) -> None:
    collection = services.get_collection(
        session=session, id=collection_id, user_id=current_user.id
    )
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    services.delete_collection(session=session, collection=collection)
    return


@router.get("/collections/{collection_id}/cards/", response_model=CardList)
def read_cards(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    if not services.check_collection_access(session, collection_id, current_user.id):
        raise HTTPException(status_code=404, detail="Collection not found")
    cards, count = services.get_cards(
        session=session, collection_id=collection_id, skip=skip, limit=limit
    )
    return CardList(data=cards, count=count)


@router.post("/collections/{collection_id}/cards/", response_model=Card)
def create_card(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
    card_in: CardCreate,
) -> Any:
    if not services.check_collection_access(session, collection_id, current_user.id):
        raise HTTPException(status_code=404, detail="Collection not found")
    return services.create_card(
        session=session, collection_id=collection_id, card_in=card_in
    )


@router.get("/collections/{collection_id}/cards/{card_id}", response_model=Card)
def read_card(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
    card_id: uuid.UUID,
) -> Any:
    if not services.check_collection_access(session, collection_id, current_user.id):
        raise HTTPException(status_code=404, detail="Collection not found")
    card = services.get_card_with_collection(
        session=session, card_id=card_id, user_id=current_user.id
    )
    if not card or card.collection_id != collection_id:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@router.put("/collections/{collection_id}/cards/{card_id}", response_model=Card)
def update_card(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
    card_id: uuid.UUID,
    card_in: CardUpdate,
) -> Any:
    if not services.check_collection_access(session, collection_id, current_user.id):
        raise HTTPException(status_code=404, detail="Collection not found")
    card = services.get_card_with_collection(
        session=session, card_id=card_id, user_id=current_user.id
    )
    if not card or card.collection_id != collection_id:
        raise HTTPException(status_code=404, detail="Card not found")
    return services.update_card(session=session, card=card, card_in=card_in)


@router.delete("/collections/{collection_id}/cards/{card_id}", status_code=204)
def delete_card(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
    card_id: uuid.UUID,
) -> None:
    if not services.check_collection_access(session, collection_id, current_user.id):
        raise HTTPException(status_code=404, detail="Collection not found")
    card = services.get_card_with_collection(
        session=session, card_id=card_id, user_id=current_user.id
    )
    if not card or card.collection_id != collection_id:
        raise HTTPException(status_code=404, detail="Card not found")
    services.delete_card(session=session, card=card)
    return


@router.post("/collections/{collection_id}/practice", response_model=PracticeSession)
def start_practice_session(
    session: SessionDep,
    current_user: CurrentUser,
    collection_id: uuid.UUID,
) -> Any:
    """Start a new practice session for a collection"""
    if not services.check_collection_access(session, collection_id, current_user.id):
        raise HTTPException(status_code=404, detail="Collection not found")

    try:
        return services.get_or_create_practice_session(
            session=session,
            collection_id=collection_id,
            user_id=current_user.id,
        )
    except EmptyCollectionError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/practice", response_model=PracticeSessionList)
def list_practice_sessions(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """List all practice sessions for the current user"""
    practice_sessions, count = services.get_practice_sessions(
        session=session,
        user_id=current_user.id,
        skip=skip,
        limit=limit,
    )
    return PracticeSessionList(data=practice_sessions, count=count)


@router.get("/practice/{practice_session_id}", response_model=PracticeSession)
def get_practice_session_status(
    session: SessionDep,
    current_user: CurrentUser,
    practice_session_id: uuid.UUID,
) -> Any:
    """Get practice session status and statistics"""
    practice_session = services.get_practice_session(
        session=session,
        session_id=practice_session_id,
        user_id=current_user.id,
    )
    if not practice_session:
        raise HTTPException(status_code=404, detail="Practice session not found")

    return practice_session


@router.get("/practice/{practice_session_id}/next", response_model=PracticeCardResponse)
def get_next_practice_card(
    session: SessionDep,
    current_user: CurrentUser,
    practice_session_id: uuid.UUID,
) -> Any:
    """Get the next card to practice"""
    practice_session = services.get_practice_session(
        session=session,
        session_id=practice_session_id,
        user_id=current_user.id,
    )
    if not practice_session:
        raise HTTPException(status_code=404, detail="Practice session not found")

    if practice_session.is_completed:
        raise HTTPException(status_code=400, detail="Practice session is completed")

    result = services.get_next_card(
        session=session, practice_session_id=practice_session_id
    )
    if not result:
        raise HTTPException(status_code=404, detail="No more cards to practice")

    card, practice_card = result
    return PracticeCardResponse(
        card=card,
        is_practiced=practice_card.is_practiced,
        is_correct=practice_card.is_correct,
    )


@router.post(
    "/practice/{practice_session_id}/cards/{card_id}/submit",
    response_model=PracticeCardResponse,
)
def submit_practice_result(
    session: SessionDep,
    current_user: CurrentUser,
    practice_session_id: uuid.UUID,
    card_id: uuid.UUID,
    is_correct: bool,
) -> Any:
    """Submit the result for a practiced card"""
    practice_session = services.get_practice_session(
        session=session,
        session_id=practice_session_id,
        user_id=current_user.id,
    )
    if not practice_session:
        raise HTTPException(status_code=404, detail="Practice session not found")

    if practice_session.is_completed:
        raise HTTPException(status_code=400, detail="Practice session is completed")

    practice_card = services.get_practice_card(
        session=session,
        practice_session_id=practice_session_id,
        card_id=card_id,
    )
    if not practice_card:
        raise HTTPException(status_code=404, detail="Practice card not found")

    if practice_card.is_practiced:
        raise HTTPException(status_code=400, detail="Card already practiced")

    practice_card = services.submit_card_result(
        session=session,
        practice_card=practice_card,
        is_correct=is_correct,
    )

    return PracticeCardResponse(
        card=practice_card.card,
        is_practiced=practice_card.is_practiced,
        is_correct=practice_card.is_correct,
    )
