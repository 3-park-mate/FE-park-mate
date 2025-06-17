import GnbNavBar from '@/components/layouts/GnbNavBar';
import LocationHeader from '@/components/layouts/LocationHeader';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LocationHeader isShadow={false} />
      {children}
      <GnbNavBar />
    </>
  );
}
