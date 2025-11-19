// API Configuration
// In production, you need to deploy the backend server and set VITE_API_URL
// For now, we'll provide a fallback that shows a helpful message
const getApiUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL;
  
  // If running in production and no API URL is configured
  if (import.meta.env.PROD && !configuredUrl) {
    console.warn(
      '⚠️ VITE_API_URL not configured for production. ' +
      'Please deploy the backend server and set VITE_API_URL environment variable.'
    );
    return null;
  }
  
  return configuredUrl || 'http://localhost:3001';
};

const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  SEND_EMAIL: API_BASE_URL ? `${API_BASE_URL}/api/send-email` : null,
  HEALTH: API_BASE_URL ? `${API_BASE_URL}/health` : null,
};

export const isApiConfigured = () => !!API_BASE_URL;

export default API_BASE_URL;
