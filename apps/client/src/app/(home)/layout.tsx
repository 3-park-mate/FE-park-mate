import HomeMainHeader from '@/components/pages/home/HomeMainHeader';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white">
      <HomeMainHeader />
      {children}
    </div>
  );
}
