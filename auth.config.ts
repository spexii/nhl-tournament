import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

import { authenticateUser } from '@/lib/auth';
import { convertPrismaRoleToTypeScriptRole } from '@/lib/utils';
import { CustomAuthError } from '@/types/errors';

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Ensure credentials are typed as { username: string, password: string }
        if (!credentials || typeof credentials.username !== "string" || typeof credentials.password !== "string") {
          return null;
        }

        const { username, password } = credentials;
        const user = await authenticateUser(username, password)

        // If no user is found, throw a custom auth error to be
        // able to define a custom error message
        if (!user) {
          throw new CustomAuthError();
        }

        return {
          id: user.id,
          username: user.username,
          role: convertPrismaRoleToTypeScriptRole(user.role),
          emailVerified: null,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // If user is logged in and they are still on the login page,
      // redirect them to the root page
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', nextUrl));
      }

      return !!auth?.user;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user
      }

      // Delete duplicate email field that already
      // exists in the user object
      delete token.email;

      return token;
    },
    session({ session, token }) {
      if(session.user) {
        session.user = token.user;
      }

      return session;
    }
  },
} satisfies NextAuthConfig;
