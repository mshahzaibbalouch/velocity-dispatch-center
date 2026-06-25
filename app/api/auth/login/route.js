import { getDashboardRoute } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, key, remember } = await req.json();

    // Basic validation (replace with real auth logic)
    if (!email || !key || typeof email !== 'string' || typeof key !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Mock verification: accept any credentials where key length >= 4
    if (key.length < 4) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Create a simple session id and derive a route
    const role = email.toLowerCase().includes('admin') ? 'admin' : email.toLowerCase().includes('driver') ? 'driver' : 'dispatcher';
    const sessionId = `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8; // seconds
    const secure = process.env.NODE_ENV === 'production';

    const cookie = `__ds_sid=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; ${secure ? 'Secure;' : ''}`;

    const redirect = getDashboardRoute(sessionId) || '/dashboard';

    return new Response(JSON.stringify({ ok: true, redirect }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
