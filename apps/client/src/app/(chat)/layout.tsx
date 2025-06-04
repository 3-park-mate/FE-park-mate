import GnbNavBar from '@/components/layouts/GnbNavBar';
import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <HomeMainHeader title="채팅" className="text-[1rem]" />
      <PaddedLayout className="py-25">{children}</PaddedLayout>
    </div>
  );
}
