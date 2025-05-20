import type { Metadata } from 'next';
import './globals.css';
import { GlobalContainerView } from '@repo/ui/components/base/CommonLayout';

export const metadata: Metadata = {
  title: {
    default: '파크메이트 호스트',
    template: '%s | 파크메이트 호스트',
  },
  description: '실시간 주차 공유 플랫폼 파크메이트 호스트 전용 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <GlobalContainerView className="bg-inner-background-gray">
          {children}
        </GlobalContainerView>
      </body>
    </html>
  );
}
