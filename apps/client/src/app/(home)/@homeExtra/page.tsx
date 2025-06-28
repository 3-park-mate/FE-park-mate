import { options } from '@/app/api/auth/[...nextauth]/options';
import NearestParking from '@/components/pages/home/NearestParking';
import ParkPointArea from '@/components/pages/home/ParkPointArea';
import { getServerSession } from 'next-auth';

export default async function page() {
  const session = await getServerSession(options);
  return (
    <>
      {session && <ParkPointArea />}
      <NearestParking />
    </>
  );
}
