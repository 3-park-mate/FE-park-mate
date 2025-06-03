import GnbNavBar from '@/components/layouts/GnbNavBar';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pb-32">
      <HeaderLayout isShadow>
        <h1 className="font-semibold">홈</h1>
      </HeaderLayout>
      {children}
      <GnbNavBar />
    </div>
  );
}
