import { NextResponse } from 'next/server';

import { clearSessionCookie } from '@/lib/auth';
import { config } from '@/lib/config';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', config.NEXT_PUBLIC_URL));

  // Clear the session cookie
  await clearSessionCookie(response);

  return response;
}