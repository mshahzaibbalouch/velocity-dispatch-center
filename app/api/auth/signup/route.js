import { getDashboardRoute } from '@/lib/auth';

export async function POST(req) {
  try {
    const { name, email, password, confirmPassword, remember } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: 'Passwords do not match' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const role = email.toLowerCase().includes('admin') ? 'admin' : email.toLowerCase().includes('driver') ? 'driver' : 'dispatcher';
    const sessionId = `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8;
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
