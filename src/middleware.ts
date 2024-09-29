import { NextResponse } from 'next/server';

import {
  getAdminPaths,
  getPublicPaths,
  getUserFromRequest,
} from '@/lib/auth';
import { auth } from '@/lib/nextAuth';
import { isAdmin } from './lib/utils';

export default auth((request) => {
  const authenticatedUser = getUserFromRequest(request.auth);

  const res = NextResponse.next();
  const publicPaths = getPublicPaths();

  if(authenticatedUser) {
    // If in login page, redirect to home
    if(request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const adminPaths = getAdminPaths();
    const isAdminPath = adminPaths.some((path) => request.nextUrl.pathname.startsWith(path));
    const admin = isAdmin(authenticatedUser.role);

    // If user is not admin and tries to access admin path, redirect to home
    if(isAdminPath && !admin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if(!publicPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return res;
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|images|.*\\.png$).*)'],
};
