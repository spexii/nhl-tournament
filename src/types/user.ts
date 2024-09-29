import { User } from '@prisma/client';

// User roles
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type SessionUser = Pick<User, 'id' | 'username' | 'email' | 'firstName' | 'lastName'> & { role: Role };