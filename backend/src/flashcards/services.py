from sqlmodel import Session, select, func

from .models import Card, Collection
from .schemas import CollectionCreate, CardCreate, CollectionUpdate, CardUpdate
import uuid

def get_collections(
    session: Session, user_id: uuid.UUID, skip: int = 0, limit: int = 100
) -> tuple[list[Collection], int]:
    count_statement = select(func.count()).where(Collection.user_id == user_id)
    count = session.exec(count_statement).one()
    statement = (
        select(Collection)
        .where(Collection.user_id == user_id)
        .offset(skip)
        .limit(limit)
    )
    collections = session.exec(statement).all()
    return collections, count


def get_collection(session: Session, id: uuid.UUID, user_id: uuid.UUID) -> Collection | None:
    statement = select(Collection).where(Collection.id == id, Collection.user_id == user_id)
    return session.exec(statement).first()


def create_collection(session: Session, collection_in: CollectionCreate, user_id: uuid.UUID) -> Collection:
    collection = Collection.model_validate(collection_in,update={"user_id": user_id})
    collection.user_id = user_id
    session.add(collection)
    session.commit()
    session.refresh(collection)
    return collection


def update_collection(
    session: Session, collection: Collection, collection_in: CollectionUpdate
) -> Collection:
    collection_data = collection_in.model_dump(exclude_unset=True)
    for key, value in collection_data.items():
        setattr(collection, key, value)
    session.add(collection)
    session.commit()
    session.refresh(collection)
    return collection


def delete_collection(session: Session, collection: Collection) -> None:
    session.delete(collection)
    session.commit()


def get_cards(
    session: Session, collection_id: uuid.UUID, skip: int = 0, limit: int = 100
) -> tuple[list[Card], int]:
    count_statement = select(func.count()).where(Card.collection_id == collection_id)
    count = session.exec(count_statement).one()
    statement = (
        select(Card)
        .where(Card.collection_id == collection_id)
        .offset(skip)
        .limit(limit)
    )
    cards = session.exec(statement).all()
    return cards, count


def get_card(session: Session, card_id: uuid.UUID) -> Card | None:
    return session.get(Card, card_id)


def get_card_with_collection(session: Session, card_id: uuid.UUID, user_id: uuid.UUID) -> Card | None:
    statement = (
        select(Card)
        .join(Collection)
        .where(
            Card.id == card_id,
            Collection.user_id == user_id
        )
    )
    return session.exec(statement).first()


def create_card(
    session: Session, collection_id: uuid.UUID, card_in: CardCreate
) -> Card:
    card = Card(collection_id=collection_id, **card_in.model_dump())
    session.add(card)
    session.commit()
    session.refresh(card)
    return card


def update_card(session: Session, card: Card, card_in: CardUpdate) -> Card:
    card_data = card_in.model_dump(exclude_unset=True)
    for key, value in card_data.items():
        setattr(card, key, value)
    session.add(card)
    session.commit()
    session.refresh(card)
    return card


def delete_card(session: Session, card: Card) -> None:
    session.delete(card)
    session.commit()
