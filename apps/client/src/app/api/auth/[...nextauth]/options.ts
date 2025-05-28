import { NextAuthOptions } from 'next-auth';
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const apiUrl = 'sign-in';
        const signInEmail = credentials.email;
        try {
          // const response = await fetch(
          //   `${process.env.BASE_API_URL}/api/v1/auth/${apiUrl}`,
          //   {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify({
          //       email: signInEmail,
          //       password: credentials.password,
          //     }),
          //     cache: 'no-cache',
          //   }
          // );
          // const user =
          //   (await response.json()) as CommonResponseType<signInDataType>;
          // console.log('user', user);
          // if (!user.isSuccess) {
          //   throw new Error(user.message);
          // }
          // return user.result;
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
          // const res = await fetch(
          //   `${process.env.BASE_API_URL}/api/v1/oauth/sign-in`,
          //   {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       provider: account.provider,
          //       accessToken: account.access_token,
          //     }),
          //     cache: 'no-cache',
          //     credentials: 'include',
          //   }
          // );
          // const setCookie = res.headers.get('set-cookie');
          // console.log(setCookie);
          // if (setCookie) {
          //   const match = setCookie.match(/oauth_cookie=([^;]+)/);
          //   const oauthCookieValue = match ? match[1] : null;
          //   console.log('OAuth 쿠키 값:', oauthCookieValue);
          //   (await cookies()).set({
          //     name: 'oauth_cookie',
          //     value: oauthCookieValue || '',
          //     httpOnly: true,
          //     sameSite: 'none',
          //     secure: true,
          //     path: '/',
          //   });
          // }
          // const data = (await res.json()) as CommonResponseType<signInDataType>;
          // console.log('server data', data);
          // if (!data.result) return '/auth/sign-in?reason=unregistered';
          // user.accessToken = data.result.accessToken;
          // user.refreshToken = data.result.refreshToken;
          // return true;
        } catch (error) {
          console.error('error', error);
          return `/auth/oauth-sign-up`;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
};
