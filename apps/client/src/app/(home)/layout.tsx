import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import GnbNavBar from '@/components/layouts/GnbNavBar';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pb-32">
      <HomeMainHeader />
      {children}
      <GnbNavBar />
    </div>
  );
}
