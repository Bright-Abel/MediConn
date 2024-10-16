import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getUserSession,
  getUser,
  restrictUser,
} from '@/lib/actions/patient.action';

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('user-session');
  const url = req.nextUrl.clone();

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const { userId } = await getUserSession();
  const user = await getUser(userId);

  // Redirect based on user role
  if (user?.prefs?.role === 'admin' && url.pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  } else if (user?.prefs?.role === '' && url.pathname.includes('/admin')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const patient = await restrictUser(userId);
  // Resist unregistered user from accessing the dashboard
  if (patient < 1 && url.pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/register', req.url));
  } else if (patient === 1 && url.pathname.includes('/user/register')) {
    return NextResponse.redirect(new URL('/user/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
};
