import GnbNavBar from '@/components/layouts/GnbNavBar';
import LocationHeader from '@/components/layouts/LocationHeader';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <LocationHeader />
      {children}
      <GnbNavBar />
    </div>
  );
}
