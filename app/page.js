import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDashboardRoute } from '@/lib/auth';

export default function Home() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('__ds_sid');
    const sessionId = sessionCookie?.value ?? null;

    if (!sessionId) {
      return redirect('/auth/login');
    }

    const dashboardRoute = getDashboardRoute(sessionId);
    return redirect(dashboardRoute);
  } catch (error) {
    // If anything unexpected happens reading cookies, send user to login
    return redirect('/auth/login');
  }
}
