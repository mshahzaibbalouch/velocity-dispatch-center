const COOKIE_NAME = '__ds_sid_public';
const BACKUP_COOKIE_NAME = '__ds_sid';

function parseDocumentCookies() {
  if (typeof document === 'undefined') return {};

  return document.cookie.split(';').reduce((cookies, cookie) => {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (!name) return cookies;
    cookies[name] = valueParts.join('=');
    return cookies;
  }, {});
}

export function getAuthTokenFromCookies() {
  const cookies = parseDocumentCookies();
  return cookies[COOKIE_NAME] || cookies[BACKUP_COOKIE_NAME] || null;
}

export function getAuthHeaders(existingHeaders = {}) {
  const token = getAuthTokenFromCookies();
  const headers = new Headers(existingHeaders || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

export async function authFetch(input, init = {}) {
  const headers = getAuthHeaders(init.headers);

  return fetch(input, {
    ...init,
    credentials: 'include',
    headers,
  });
}
