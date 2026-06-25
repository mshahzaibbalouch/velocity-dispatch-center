export function getSessionRole(sessionId) {
  if (!sessionId) return null;

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
    default:
      return '/dashboard';
  }
}
