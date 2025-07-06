import { HomeTabMenuBar } from '@/components/pages/home/HomeTabMenuBar';
import ReservationStatusSection from '@/components/pages/home/ReservationStatusSection';
import UsingStatusSection from '@/components/pages/home/UsingStatusSection';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import HomeGuestSection from '@/components/pages/home/HomeGuestSection';

export default async function page() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <HomeTabMenuBar
          tabContents={{
            reservationParking: <ReservationStatusSection />,
            currentParking: <UsingStatusSection />,
          }}
        />
      ) : (
        <HomeGuestSection />
      )}
    </>
  );
}
