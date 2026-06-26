import jwt from 'jsonwebtoken';

export function getSessionRole(sessionId) {
  if (!sessionId) return null;

  try {
    const payload = jwt.decode(sessionId);

    if (payload && typeof payload === 'object' && typeof payload.role === 'string') {
      return payload.role;
    }
  } catch (error) {
    // Ignore invalid token format and fall back to heuristic
  }

  const normalized = sessionId.toLowerCase();

  if (normalized.includes('admin')) {
    return 'admin';
  }

  if (normalized.includes('driver')) {
    return 'driver';
  }

  if (normalized.includes('manager')) {
    return 'manager';
  }

  return 'dispatcher';
}

export function getDashboardRoute(sessionId) {
  const role = getSessionRole(sessionId);

  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'driver':
      return '/dashboard';
    case 'manager':
      return '/dashboard';
    case 'dispatcher':
      return '/dashboard';
    default:
      return '/dashboard';
  }
}
