class FlashcardsException(Exception):
    """Base exception for flashcards module"""

    pass


class EmptyCollectionError(FlashcardsException):
    """Raised when trying to create a practice session for an empty collection"""

    pass
