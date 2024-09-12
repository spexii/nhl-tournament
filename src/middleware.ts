import { NextRequest, NextResponse } from 'next/server';

import {
  decodeAuthToken,
  generateAuthToken,
  getAdminPaths,
  getSessionCookie,
  setSessionCookie
} from '@/lib/auth';
import { isAdmin } from './lib/utils';

export async function middleware(request: NextRequest) {
  const sessionCookie = await getSessionCookie();

  const res = NextResponse.next();

  const nonRedirectPaths = ['/', '/login'];

  const adminPaths = getAdminPaths();
  const isAdminPath = adminPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if(sessionCookie) {
    try {
      // Decode the current auth token
      const decodedAuthToken = await decodeAuthToken(sessionCookie.value);

      // Regenerate new auth token with new expiration time
      const { username, role } = decodedAuthToken;
      const admin = isAdmin(role);

      const regeneratedToken = await generateAuthToken(username, role);
      await setSessionCookie(res, regeneratedToken);

      res.headers.set('X-User-Authenticated', 'true');

      if(isAdminPath && !admin) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      res.headers.set('X-User-Admin', admin.toString());
    } catch (error) {
      console.error('Error decoding token', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    res.headers.set('X-User-Authenticated', 'false');
    res.headers.set('X-User-Admin', 'false');

    if(!nonRedirectPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return res;
}

// Middleware is applied basically to all pages
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};