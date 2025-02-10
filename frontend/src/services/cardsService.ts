import { API_BASE_URL, handleResponse } from '@/config/api';

export const cardsService = {
  getByCollection: async (collectionId) => {
    const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/cards`);
    return handleResponse(response);
  },

  get: async (cardId) => {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`);
    return handleResponse(response);
  },

  create: async (card) => {
    const response = await fetch(`${API_BASE_URL}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    return handleResponse(response);
  },

  update: async (cardId, card) => {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    return handleResponse(response);
  },

  delete: async (cardId) => {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }
};
