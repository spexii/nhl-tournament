'use server'

import { compare } from 'bcrypt-ts';
import { jwtVerify, SignJWT } from 'jose';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { User } from '@prisma/client';

import db from '@/db';
import { config } from '@/lib/config';
import { Role as TypeScriptRole } from '@/types/userRoles';

export const authenticateUser = async (username: string, password: string): Promise<User | undefined> => {
  const user = await db.user.findUnique({
    where: {
      username: username
    },
  })

  if (user) {
    const isValidPassword = await compare(password, user.password);

    if (isValidPassword) {
      return user
    }
  }

  return undefined;
};

const hexToUint8Array = (hex: string): Uint8Array => {
  const match = hex.match(/.{1,2}/g);

  if (!match) {
    throw new Error('Invalid hex string');
  }

  return Uint8Array.from(match.map((byte) => parseInt(byte, 16)));
}

interface UserPayload {
  username: string;
  role: TypeScriptRole;
}

export const generateAuthToken = async (username: string, role: TypeScriptRole): Promise<string> => {
  const hexSecret = config.SESSION_SECRET;
  const secret = hexToUint8Array(hexSecret);

  const token = await new SignJWT({ username, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${config.SESSION_COOKIE_MAX_AGE} seconds`)  // Set expiration time
    .sign(secret);

  return token
}

export const decodeAuthToken = async (token: string): Promise<UserPayload> => {
  const hexSecret = config.SESSION_SECRET;
  const secret = hexToUint8Array(hexSecret);

  // Verify the JWT token
  const { payload } = await jwtVerify<UserPayload>(token, secret);

  return payload;
}

const getCookieOptions = (maxAge?: number): Partial<ResponseCookie> => {
  return {
    httpOnly: true,
    maxAge: maxAge ?? config.SESSION_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  };
}

export const getAdminPaths = () => {
  return [ '/admin' ];
}

export const setSessionCookie = async (res: NextResponse, token: string) => {
  const cookieOptions = getCookieOptions();

  res.cookies.set(config.SESSION_COOKIE_NAME, token, cookieOptions);
};

export const getSessionCookie = async () => {
  const cookieStore = cookies();

  return cookieStore.get(config.SESSION_COOKIE_NAME);
}

export const clearSessionCookie = async (res: NextResponse) => {
  const cookieOptions = getCookieOptions(0);

  res.cookies.set(config.SESSION_COOKIE_NAME, '', cookieOptions);
}
