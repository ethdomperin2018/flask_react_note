import traceback

try:
    from .users.models import User  # noqa
    from .flashcards.models import Collection  # noqa
except Exception:
    traceback.print_exc()
