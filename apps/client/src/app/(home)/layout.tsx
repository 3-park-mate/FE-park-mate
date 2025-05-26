import NotificationButton from '@/components/common/NotificationButton';
import ParkmateLogo from '@repo/ui/components/icon/ParkmateLogo';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative bg-inner-background-gray">
      <header className="px-5 flex justify-between pt-10 pb-11">
        <ParkmateLogo />
        <NotificationButton />
      </header>
      {children}
    </div>
  );
}
