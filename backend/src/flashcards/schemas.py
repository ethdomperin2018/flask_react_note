import uuid
from typing import Optional

from sqlmodel import SQLModel


class CollectionBase(SQLModel):
    name: str
    description: Optional[str] = None


class CollectionCreate(CollectionBase):
    pass


class CollectionUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None


class CardBase(SQLModel):
    front: str
    back: str


class CardCreate(CardBase):
    pass


class CardUpdate(CardBase):
    front: Optional[str] = None
    back: Optional[str] = None


class Card(CardBase):
    id: uuid.UUID
    collection_id: uuid.UUID


class Collection(CollectionBase):
    id: uuid.UUID
    user_id: uuid.UUID
    cards: list[Card]


class CollectionList(SQLModel):
    data: list[Collection]
    count: int


class CardList(SQLModel):
    data: list[Card]
    count: int
