import { NextResponse } from 'next/server';

export async function POST() {
  const secure = process.env.NODE_ENV === 'production';
  const cookie = `__ds_sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${secure ? 'Secure;' : ''}`;
  const publicCookie = `__ds_sid_public=; Path=/; SameSite=Lax; Max-Age=0; ${secure ? 'Secure;' : ''}`;
  const headers = new Headers();
  headers.append('Set-Cookie', cookie);
  headers.append('Set-Cookie', publicCookie);
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify({ ok: true, redirect: '/auth/login' }), {
    status: 200,
    headers,
  });
}
