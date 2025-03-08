from typing import Any

from google.genai import types

from src.core.config import settings

DEFAULT_MODEL = settings.AI_MODEL
DEFAULT_TEMPERATURE = 0.2
DEFAULT_TOP_P = 0.95
DEFAULT_TOP_K = 40
DEFAULT_MAX_OUTPUT_TOKENS = 2048

SAFETY_SETTINGS = [
    types.SafetySetting(
        category="HARM_CATEGORY_HARASSMENT",
        threshold="BLOCK_LOW_AND_ABOVE",
    ),
    types.SafetySetting(
        category="HARM_CATEGORY_HATE_SPEECH",
        threshold="BLOCK_LOW_AND_ABOVE",
    ),
    types.SafetySetting(
        category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold="BLOCK_LOW_AND_ABOVE",
    ),
    types.SafetySetting(
        category="HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold="BLOCK_LOW_AND_ABOVE",
    ),
    types.SafetySetting(
        category="HARM_CATEGORY_CIVIC_INTEGRITY",
        threshold="BLOCK_LOW_AND_ABOVE",
    ),
]


def create_content_config(
    temperature: float = DEFAULT_TEMPERATURE,
    top_p: float = DEFAULT_TOP_P,
    top_k: int = DEFAULT_TOP_K,
    max_output_tokens: int = DEFAULT_MAX_OUTPUT_TOKENS,
    safety_settings: list | None = None,
    response_mime_type: str = "application/json",
    response_schema: Any | None = None,
    system_instruction: str | None = None,
) -> types.GenerateContentConfig:
    system_instruction_parts = None
    if system_instruction:
        system_instruction_parts = [
            types.Part.from_text(text=system_instruction),
        ]

    return types.GenerateContentConfig(
        temperature=temperature,
        top_p=top_p,
        top_k=top_k,
        max_output_tokens=max_output_tokens,
        safety_settings=safety_settings or SAFETY_SETTINGS,
        response_mime_type=response_mime_type,
        response_schema=response_schema,
        system_instruction=system_instruction_parts,
    )
