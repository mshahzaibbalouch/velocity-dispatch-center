import { requireAuth, forbiddenResponse, requireRole } from '@/lib/auth';

export function authorizeRequest(req, allowedRoles = []) {
  const user = requireAuth(req);
  if (!user) {
    return { error: true, response: forbiddenResponse('Invalid or missing auth token') };
  }

  if (allowedRoles.length > 0 && !requireRole(user, allowedRoles)) {
    return { error: true, response: forbiddenResponse('Insufficient permissions') };
  }

  return { error: false, user };
}
