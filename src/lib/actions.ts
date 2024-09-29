'use server';
 
import { AuthError } from 'next-auth';
import { signIn } from './nextAuth';

import { CustomAuthError } from '@/types/errors';
 
export async function authenticate(
  username: string,
  password: string,
) {
  try {
    await signIn('credentials', { redirect: false, username, password });

    return { success: true, message: 'Login successful' };
  } catch (error) {
    if(error instanceof CustomAuthError) {
      return { success: false, message: error.message }
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: error.message }
        default:
          return { success: false, message: error.message }
      }
    }

    throw error;
  }
}