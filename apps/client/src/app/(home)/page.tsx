import { HomeTabMenuBar } from '@/components/pages/home/HomeTabMenuBar';
import ReservationStatusSection from '@/components/pages/home/ReservationStatusSection';
import UsingStatusSection from '@/components/pages/home/UsingStatusSection';

export default function page() {
  return (
    <>
      <HomeTabMenuBar
        tabContents={{
          reservationParking: <ReservationStatusSection />,
          currentParking: <UsingStatusSection />,
        }}
      />
    </>
  );
}
