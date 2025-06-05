import OptionsDropdown from '@/components/common/OptionsDropdown';
import MyParkingLotListSection from '@/components/pages/myParkingLot/MyParkingLotListSection';
import { myParkingLotSortMenu } from '@/data/initialDatas';
import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { Suspense } from 'react';

export default function page() {
  return (
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
        <MyParkingLotListSection parkingLotDatas={parkingCarouselItemsDummy} />
      </PaddedLayout>
    </main>
  );
}
