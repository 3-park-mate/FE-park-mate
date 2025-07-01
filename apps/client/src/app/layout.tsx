import type { Metadata } from 'next';
import './globals.css';
import { GlobalContainerView } from '@repo/ui/components/common/CommonLayouts';
import AuthContextProvider from '@/provider/AuthContextProvider';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { FcmInitializer } from '@/components/common/FcmInitializer';

export const metadata: Metadata = {
  title: {
    default: '파크메이트',
    template: '%s | 파크메이트',
  },
  description: '실시간 주차 공유 플랫폼 파크메이트',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  // console.log('session', session);
  const isAuth = !!session?.user as boolean;
  console.log('isAuth', isAuth);
  return (
    <html lang="ko">
      <body>
        <AuthContextProvider isAuth={isAuth}>
          <GlobalContainerView>
            {children}
            {isAuth && <FcmInitializer />}
          </GlobalContainerView>
        </AuthContextProvider>
      </body>
    </html>
  );
}
