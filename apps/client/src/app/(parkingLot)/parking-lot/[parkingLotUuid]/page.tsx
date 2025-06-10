import PageHeader from '@/components/layouts/PageHeader';
import DetailInfoSection from '@/components/pages/parkingLot/DetailInfoSection';
import DetailInfoMenuSection from '@/components/pages/parkingLot/DetailInfoMenuSection';
import { HomeTabMenu } from '@/components/pages/home/HomeTabMenu';
import ParkingDetailContent from '@/components/pages/parkingLot/ParkingDetailContent';
import {
  parkingDetailDummy,
  parkingOperationDummy,
  reviewSummaryDummy,
} from '@/data/parkingDummyDatas';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const { parkingLotUuid } = await params;

  return (
    <>
      <PageHeader title={parkingDetailDummy.name} />
      <main className="pb-32 bg-inner-background-gray">
        <DetailInfoSection
          thumbImageUrl={parkingDetailDummy.imageUrls[0] ?? ''}
          baseFee={parkingOperationDummy.baseFee}
          name={parkingDetailDummy.name}
          averageRating={reviewSummaryDummy.averageRating}
          totalReviews={reviewSummaryDummy.totalReviews}
          distance={100}
          availableSpots={10}
          registeredParkingCount={parkingDetailDummy.registeredParkingCount}
        />
        <DetailInfoMenuSection
          hostUuid={parkingDetailDummy.hostUuid}
          parkingLotUuid={parkingLotUuid}
          isActive={parkingOperationDummy.isActive}
          like={1}
          dislike={99}
          baseFee={parkingOperationDummy.baseFee}
          availableSpots={10}
          registeredParkingCount={parkingDetailDummy.registeredParkingCount}
        />
        <ParkingDetailContent />
      </main>
    </>
  );
}
