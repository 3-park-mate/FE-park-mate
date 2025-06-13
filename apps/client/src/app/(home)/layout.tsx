import GnbNavBar from '@/components/layouts/GnbNavBar';
import LocationHeader from '@/components/layouts/LocationHeader';

export default function layout({
  children,
  homeExtra,
}: Readonly<{
  children: React.ReactNode;
  homeExtra: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pb-32">
      <LocationHeader />
      <main>
        {children}
        {homeExtra}
      </main>
      <GnbNavBar />
    </div>
  );
}
