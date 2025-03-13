from collections.abc import Generator
from typing import Annotated, Any

from fastapi import Depends
from google import genai
from google.genai import types
from google.genai.models import AsyncModels

from src.core.config import settings

from .exceptions import AIGenerationError


class GeminiProvider:
    """Provider for Google's Gemini AI model."""

    def __init__(self, model_name: str):
        """Initialize the Gemini provider with the specified model."""
        self.model_name = model_name
        self.client = genai.Client(api_key=settings.AI_API_KEY)
        self.async_models = AsyncModels(self.client._api_client)

    async def run_model(
        self, content_config: types.GenerateContentConfig, prompt: str
    ) -> Any:
        try:
            content = types.Content(
                role="user", parts=[types.Part.from_text(text=prompt)]
            )
            response = await self.async_models.generate_content(
                model=self.model_name,
                contents=[content],
                config=content_config,
            )

            if not response.candidates or not response.candidates[0].content.parts:
                raise AIGenerationError("No response generated from AI model")

            return response.candidates[0].content.parts[0].text
        except Exception as e:
            raise AIGenerationError(f"AI generation failed: {str(e)}")


if settings.ai_models_enabled:
    gemini_provider = GeminiProvider(model_name=settings.AI_MODEL)
else:
    gemini_provider = None


def get_provider() -> Generator[GeminiProvider, None, None]:
    assert gemini_provider is not None, "AI models are not enabled or configured"
    yield gemini_provider


GeminiProviderDep = Annotated[GeminiProvider, Depends(get_provider)]
