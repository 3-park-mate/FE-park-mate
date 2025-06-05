import GnbNavBar from '@/components/layouts/GnbNavBar';
import HostMainHeader from '@/components/layouts/HostMainHeader';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pb-32">
      <HostMainHeader title="홈" />
      {children}
      <GnbNavBar />
    </div>
  );
}
