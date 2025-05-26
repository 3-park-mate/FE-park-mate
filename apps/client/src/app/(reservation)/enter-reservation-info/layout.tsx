import NotificationButton from '@/components/common/NotificationButton';
import ReservationHeader from '@/components/pages/reservation/ReservationHeader';
import ParkmateLogo from '@repo/ui/components/icon/ParkmateLogo';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen px-5">
      <ReservationHeader />
      {children}
    </div>
  );
}
