import uuid
from datetime import datetime, timezone

from sqlmodel import Field, Relationship, SQLModel


class Collection(SQLModel, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(index=True)
    user_id: uuid.UUID = Field(index=True)
    cards: list["Card"] = Relationship(back_populates="collection")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Card(SQLModel, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    front: str
    back: str
    collection_id: uuid.UUID = Field(foreign_key="collection.id")
    collection: Collection = Relationship(back_populates="cards")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
