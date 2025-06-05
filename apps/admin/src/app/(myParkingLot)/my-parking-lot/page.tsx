import OptionsDropdown from '@/components/common/OptionsDropdown';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import HostMainHeader from '@/components/layouts/HostMainHeader';
import MyParkingLotListSection from '@/components/pages/myParkingLot/MyParkingLotListSection';
import { myParkingLotSortMenu } from '@/data/initialDatas';
import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <HostMainHeader title="내 주차장" />
      <main>
        <PaddedLayout className="py-3">
          <Suspense fallback={<div></div>}>
            <OptionsDropdown
              className="pt-1 pb-3"
              paramKey="filter"
              defaultLabel="필터"
              options={myParkingLotSortMenu}
            />
          </Suspense>
          <MyParkingLotListSection
            parkingLotDatas={parkingCarouselItemsDummy}
          />
        </PaddedLayout>
      </main>
      <GnbNavBar />
    </>
  );
}
