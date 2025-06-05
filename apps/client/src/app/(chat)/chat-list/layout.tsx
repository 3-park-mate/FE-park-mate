import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <HomeMainHeader title="채팅" type="backButton" />
      <PaddedLayout className="py-5">{children}</PaddedLayout>
    </div>
  );
}
