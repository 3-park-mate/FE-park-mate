import { HomeTabMenuBar } from '@/components/pages/home/HomeTabMenuBar';
import NearestParking from '@/components/pages/home/NearestParking';
import ParkPointArea from '@/components/pages/home/ParkPointArea';
import ReservationStatusSection from '@/components/pages/home/ReservationStatusSection';
import UsingStatusSection from '@/components/pages/home/UsingStatusSection';

export default function page() {
  return (
    <main>
      <HomeTabMenuBar
        tabContents={{
          reservationParking: <ReservationStatusSection />,
          currentParking: <UsingStatusSection />,
        }}
      />
      <ParkPointArea />
      <NearestParking />
    </main>
  );
}
