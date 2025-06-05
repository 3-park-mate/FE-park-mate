import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import GnbNavBar from '@/components/layouts/GnbNavBar';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <HomeMainHeader type="location" title="서울 코엑스 주변" isShadow />
      {children}
      <GnbNavBar />
    </div>
  );
}
