const trimTrailingSlash = (url) => String(url || '').replace(/\/+$/, '');

const DEFAULT_API = 'https://education-managment.onrender.com';

/**
 * In development, use same-origin URLs like `/api/...` so Create React App's
 * package.json `proxy` can forward them to the API — avoids browser CORS.
 * Set REACT_APP_API_URL to override (e.g. http://localhost:5000 for a local API).
 */
function getApiBase() {
  const fromEnv = process.env.REACT_APP_API_URL;
  if (fromEnv != null && String(fromEnv).trim() !== '') {
    return trimTrailingSlash(fromEnv);
  }
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  return DEFAULT_API;
}

export const API_BASE_URL = getApiBase();
