import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getUserSession,
  getUser,
  getPatient,
} from '@/lib/actions/patient.action';

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('user-session');

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
};

// if (cookie && req.nextUrl.pathname === '/login') {
//   return NextResponse.redirect(new URL('/user/dashboard', req.url));
// }
// const { userId } = await getUserSession();
// const user = await getUser(userId);
// const patient1 = await getPatient(userId);

// if (user?.prefs?.role === 'admin') {
//   return NextResponse.redirect(new URL('/admin', req.url));
// }

// if (!patient || patient.total === 0) {
//   return NextResponse.redirect(new URL('/user/register', req.url));
// }
