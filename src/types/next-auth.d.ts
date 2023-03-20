import { type DefaultUser, type DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      role?: string;
      token?: JWT;
    } & User &
      DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
    accessToken?: string | JWT;
    refreshToken?: string | JWT;
  }
}
