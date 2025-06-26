import { getMyParkingLots } from '@/actions/parking/parking-service';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import HostMainHeader from '@/components/layouts/HostMainHeader';
import MyParkingLotListSection from '@/components/pages/myParkingLot/MyParkingLotListSection';
import { ParkingLotItem } from '@/types/parkingDataTypes';
import { Suspense } from 'react';

export default async function page() {
  const { data: parkingLots } = (await getMyParkingLots()) as {
    success: true;
    data: ParkingLotItem[];
  };

  return (
    <>
      <HostMainHeader title="내 주차장" />
      <main className="pb-32">
        <Suspense fallback={<div></div>}>
          <MyParkingLotListSection parkingLotDatas={parkingLots} />
        </Suspense>
      </main>
      <GnbNavBar />
    </>
  );
}
