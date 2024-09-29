import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  public readonly kind = 'signIn';

  constructor() {
    super();
    this.message = 'Invalid credentials';
    this.stack = undefined;
  }
}