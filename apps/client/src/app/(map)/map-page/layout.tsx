import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import GnbNavBar from '@/components/layouts/GnbNavBar';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <HomeMainHeader />
      {children}
      <GnbNavBar />
    </div>
  );
}
