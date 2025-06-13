import SimpleHeader from '@/components/layouts/SimpleHeader';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <SimpleHeader title="채팅" />
      <PaddedLayout className="py-5">{children}</PaddedLayout>
    </div>
  );
}
