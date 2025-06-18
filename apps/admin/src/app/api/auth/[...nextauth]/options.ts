import { SignInResponseDataType } from '@/types/authDataTypes';
import { CommonResponseType } from '@/types/responseDataTypes';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentilas',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        console.log('credentials', credentials);
        try {
          const res = await fetch(
            `${process.env.BASE_API_URL}/auth-service/api/v1/host/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              cache: 'no-cache',
            }
          );
          // console.log('res', res);
          const user =
            (await res.json()) as CommonResponseType<SignInResponseDataType>;
          // console.log('user', user);
          if (!res.ok || user.code !== 200 || !user.data) {
            throw new Error(user.message);
          }
          return {
            accessToken: user.data.accessToken,
            refreshToken: user.data.refreshToken,
            uuid: user.data.hostUuid,
          } as User;
        } catch (error) {
          console.error('authorize error:', error);
          throw new Error(
            (error as { message?: string })?.message ?? '로그인에 실패했습니다.'
          );
        }
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        name: token.name,
        uuid: token.uuid,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (!url || url === '/api/auth/signin') {
        return `${baseUrl}/`;
      }

      if (url.startsWith('http')) {
        return url.startsWith(baseUrl) ? url : baseUrl;
      }
      return baseUrl + url;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
};
