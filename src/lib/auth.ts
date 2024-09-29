'use server'

import { User } from '@prisma/client';
import { compare } from 'bcrypt-ts';
import { Session } from 'next-auth';

import db from '@/db';
import { SessionUser } from '@/types/user';
import { auth } from './nextAuth';

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

export const getUserFromSession = async () => {
  const session = await auth();
  
  if (!session || !session.user.id) {
    return undefined;
  }

  return {
    id: session.user.id,
    username: session.user.username,
    email: typeof session.user.email === 'string' ? session.user.email : null,
    role: session.user.role,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  };
}

export const getUserFromRequest = (session: Session | null): SessionUser | undefined => {
  if (!session || !session.user.id) {
    return undefined;
  }

  return {
    id: session.user.id,
    username: session.user.username,
    email: typeof session.user.email === 'string' ? session.user.email : null,
    role: session.user.role,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  };
}

export const getPublicPaths = () => {
  return ['/', '/login']
}

export const getAdminPaths = () => {
  return [ '/admin' ];
}
