import { API_BASE_URL, handleResponse } from '@/config/api';

export const collectionsService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/collections`);
    return handleResponse(response);
  },

  get: async (id) => {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`);
    return handleResponse(response);
  },

  create: async (name) => {
    const response = await fetch(`${API_BASE_URL}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  rename: async (id, name) => {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  }
};
