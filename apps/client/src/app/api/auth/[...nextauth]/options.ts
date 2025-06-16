import { SignInResponseDataType } from '@/types/authDataTypes';
import { CommonResponseType } from '@/types/responseDataTypes';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

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
            `${process.env.BASE_API_URL}/auth-service/api/v1/user/login`,
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
            uuid: user.data.userUuid,
          } as User;
        } catch (error) {
          console.error('authorize error:', error);
          throw new Error(
            (error as { message?: string })?.message ?? '로그인에 실패했습니다.'
          );
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider !== 'credentials') {
        console.log('account', account);
        console.log('user', user);
        try {
          const res = await fetch(
            `${process.env.BASE_API_URL}/auth-service/api/v1/user/socialRegister`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Social-Access-Token': account.access_token ?? '',
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                phoneNumber: '01012345432',
                provider: account.provider.toUpperCase(),
              }),
              cache: 'no-cache',
            }
          );
          const data =
            (await res.json()) as CommonResponseType<SignInResponseDataType>;
          console.log('server data', data);
          user.accessToken = data.data.accessToken;
          user.refreshToken = data.data.refreshToken;
          user.uuid = data.data.userUuid;
          console.log('ok');
          return true;
        } catch (error) {
          console.error('authorize error:', error);
          return `/error`;
        }
      }
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
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
};
