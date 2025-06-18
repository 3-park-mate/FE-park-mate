import PageHeader from '@/components/layouts/PageHeader';
import DetailInfoSection from '@/components/pages/parkingLot/DetailInfoSection';
import DetailInfoMenuSection from '@/components/pages/parkingLot/DetailInfoMenuSection';
import ParkingDetailContent from '@/components/pages/parkingLot/ParkingDetailContent';
import {
  parkingDetailDummy,
  parkingOperationDummy,
  reviewSummaryDummy,
} from '@/data/parkingDummyDatas';
import { getParkingLotById } from '@/actions/parking/parking-service';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = <div>주차장을 찾을 수 없습니다.</div>;

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;

  const res = await getParkingLotById(parkingLotUuid);
  const parkingLotData = res.success ? res.data : null;
  if (!parkingLotData) return <div>주차장을 찾을 수 없습니다.</div>;

  console.log(parkingLotData);

  return (
    <>
      <PageHeader title={parkingLotData.name} isShadow={false} />
      <main className="pb-32 bg-inner-background-gray">
        <DetailInfoSection
          thumbImageUrl={parkingLotData.thumbnailUrl}
          baseFee={parkingOperationDummy.baseFee}
          name={parkingLotData.name}
          averageRating={reviewSummaryDummy.averageRating}
          totalReviews={reviewSummaryDummy.totalReviews}
          distance={100}
          availableSpots={parkingLotData.capacity}
          registeredParkingCount={parkingDetailDummy.registeredParkingCount}
        />
        <DetailInfoMenuSection
          hostUuid={parkingLotData.hostUuid}
          parkingLotUuid={parkingLotUuid}
          isActive={parkingOperationDummy.isActive}
          like={parkingLotData.likeCount}
          dislike={parkingLotData.dislikeCount}
          baseFee={parkingOperationDummy.baseFee}
          availableSpots={10}
          registeredParkingCount={parkingDetailDummy.registeredParkingCount}
        />
        <ParkingDetailContent
          mainAddress={parkingLotData.address}
          extraInfo={parkingLotData.extraInfo}
          imageUrls={parkingLotData.imageUrls}
          options={parkingLotData.options}
        />
      </main>
    </>
  );
}
