// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
