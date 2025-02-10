export const API_BASE_URL = 'http://192.168.86.27:3000';
// export const API_BASE_URL = 'http://localhost:3000';

export const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
