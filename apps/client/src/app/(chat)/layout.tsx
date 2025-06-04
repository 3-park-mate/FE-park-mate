import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from '@/components/layouts/BackButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <HomeMainHeader title="채팅" className="text-[1rem]" Icon={BackButton} />
      <PaddedLayout className="py-25">{children}</PaddedLayout>
    </div>
  );
}
