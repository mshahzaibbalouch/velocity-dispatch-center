import { getDashboardRoute } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { email, key, remember } = await req.json();

    if (!email || !key || typeof email !== 'string' || typeof key !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    await dbConnect();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const isPasswordValid = await bcrypt.compare(key, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: remember ? '30d' : '8h' },
    );

    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8;
    const secure = process.env.NODE_ENV === 'production';
    const cookie = `__ds_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; ${secure ? 'Secure;' : ''}`;
    const publicCookie = `__ds_sid_public=${token}; Path=/; SameSite=Lax; Max-Age=${maxAge}; ${secure ? 'Secure;' : ''}`;

    const redirect = getDashboardRoute(token) || '/dashboard';
    const headers = new Headers();
    headers.append('Set-Cookie', cookie);
    headers.append('Set-Cookie', publicCookie);
    headers.append('Content-Type', 'application/json');

    return new Response(JSON.stringify({ ok: true, redirect }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
