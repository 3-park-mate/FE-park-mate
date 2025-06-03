import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';

export default function layout({
  children,
  homeExtra,
}: Readonly<{
  children: React.ReactNode;
  homeExtra: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pb-32">
      <HomeMainHeader Icon={MarkerIcon} title="서울 코엑스 주변" />
      <main>
        {children}
        {homeExtra}
      </main>
      <GnbNavBar />
    </div>
  );
}
