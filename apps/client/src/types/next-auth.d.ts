import { DefaultSession, DefaultUser } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      name?: string;
      userUuid?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    name?: string;
    userUuid?: string;
  }
}
