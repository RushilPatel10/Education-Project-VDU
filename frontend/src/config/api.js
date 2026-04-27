const trimTrailingSlash = (url) => String(url || '').replace(/\/+$/, '');

const DEFAULT_API = 'https://education-managment.onrender.com';

/**
 * In development, use same-origin `/api/...` URLs so Create React App proxy
 * can forward requests to the local backend defined in package.json `proxy`.
 * Set REACT_APP_API_URL to override with an explicit backend URL.
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
