import { getMyParkingLots } from '@/actions/parking/parking-service';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import HostMainHeader from '@/components/layouts/HostMainHeader';
import MyParkingLotListSection from '@/components/pages/myParkingLot/MyParkingLotListSection';
import { ParkingLotItem } from '@/types/parkingDataTypes';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default async function page() {
  const { data: parkingLots } = (await getMyParkingLots()) as {
    success: true;
    data: ParkingLotItem[];
  };
  console.log(parkingLots);

  return (
    <>
      <HostMainHeader title="내 주차장" />
      <main className="pb-32">
        <PaddedLayout className="py-6">
          {/* <Suspense fallback={<div></div>}>
            <OptionsDropdown
              className="pt-1 pb-3"
              paramKey="filter"
              defaultLabel="필터"
              options={myParkingLotSortMenu}
            />
          </Suspense> */}
          <MyParkingLotListSection parkingLotDatas={parkingLots} />
        </PaddedLayout>
      </main>
      <GnbNavBar />
    </>
  );
}
