import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <HomeMainHeader icon={<MarkerIcon />} title="서울 코엑스 주변" isShadow />
      {children}
      <GnbNavBar />
    </div>
  );
}
