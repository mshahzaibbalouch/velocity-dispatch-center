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
      return '/driver/dashboard';
    case 'manager':
      return '/manager/dashboard';
    case 'dispatcher':
      return '/dispatcher/dashboard';
    default:
      return '/dispatcher/dashboard';
  }
}

export function getAuthTokenFromRequest(req) {
  if (!req?.headers) return null;

  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization') || '';
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  if (bearerMatch) {
    return bearerMatch[1].trim();
  }

  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (!name) return acc;
    acc[name] = valueParts.join('=');
    return acc;
  }, {});

  return cookies['__ds_sid'] || cookies['__ds_sid_public'] || null;
}

export function verifyAuthToken(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function requireAuth(req) {
  const token = getAuthTokenFromRequest(req);
  if (!token) return null;

  return verifyAuthToken(token);
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return new Response(JSON.stringify({ success: false, message }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function forbiddenResponse(message = 'Forbidden') {
  return new Response(JSON.stringify({ success: false, message }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function requireRole(user, allowedRoles = []) {
  if (!user || !Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    return false;
  }

  return allowedRoles.includes(user.role);
}
