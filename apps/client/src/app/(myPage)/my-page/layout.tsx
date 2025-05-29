import GnbNavBar from '@/components/layouts/GnbNavBar';
import HomeMainHeader from '@/components/pages/home/HomeMainHeader';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <GnbNavBar />
    </div>
  );
}
