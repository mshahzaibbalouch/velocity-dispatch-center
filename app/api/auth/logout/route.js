import { NextResponse } from 'next/server';

export async function POST() {
  const secure = process.env.NODE_ENV === 'production';
  const cookie = `__ds_sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${secure ? 'Secure;' : ''}`;

  return new Response(JSON.stringify({ ok: true, redirect: '/auth/login' }), {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
      'Content-Type': 'application/json',
    },
  });
}
