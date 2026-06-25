import { NextResponse } from 'next/server';
import { getDashboardRoute } from './lib/auth';

/**
 * Middleware to enforce authentication across the app.
 * - If `__ds_sid` cookie is missing, redirect to `/auth/login`.
 * - If user visits `/auth` with a valid session, redirect to their dashboard.
 */
export function middleware(req) {
  try {
    const { pathname } = req.nextUrl;

    // Allow Next internals, API routes, static assets and auth endpoints
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/static') ||
      pathname.startsWith('/assets') ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    const sid = req.cookies.get('__ds_sid')?.value ?? null;

    // If no session, force login for protected routes
    if (!sid) {
      // allow access to auth pages so user can sign in
      if (pathname.startsWith('/auth')) return NextResponse.next();

      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // If session exists and user visits auth pages, redirect to dashboard
    if (pathname.startsWith('/auth')) {
      const dest = getDashboardRoute(sid) || '/dashboard';
      return NextResponse.redirect(new URL(dest, req.url));
    }

    return NextResponse.next();
  } catch (err) {
    // On unexpected errors, send user to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

// Match all app routes except Next internals and api/static assets
export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico|assets).*)'],
};
