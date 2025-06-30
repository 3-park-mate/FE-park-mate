import PageHeader from '@/components/layouts/PageHeader';
import InfoWithThumbnail from '@/components/pages/parkingLot/InfoWithThumbnail';
import DetailMenuButtons from '@/components/pages/parkingLot/DetailMenuButtons';
import ParkingDetailContent from '@/components/pages/parkingLot/ParkingDetailContent';
import {
  parkingOperationDummy,
  reviewSummaryDummy,
} from '@/data/parkingDummyDatas';
import {
  getDailyOperationById,
  getParkingLotById,
} from '@/actions/parking/parking-service';
import ParkingDetailTabBar from '@/components/pages/parkingLot/ParkingDetailTabBar';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = <div>주차장을 찾을 수 없습니다.</div>;

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;

  const [parkingLotRes, operationRes] = await Promise.all([
    getParkingLotById(parkingLotUuid),
    getDailyOperationById(parkingLotUuid),
  ]);

  if (!parkingLotRes.success || !operationRes.success || !parkingLotRes.data) {
    return fallback;
  }

  const parkingLotData = parkingLotRes.data;
  const operationData = operationRes.data;

  return (
    <>
      <PageHeader title={parkingLotData.name} isShadow={false} />
      <main className="pb-32 bg-inner-background-gray">
        <InfoWithThumbnail
          thumbImageUrl={parkingLotData.thumbnailUrl}
          baseFee={operationData.baseFee}
          name={parkingLotData.name}
          averageRating={reviewSummaryDummy.averageRating}
          totalReviews={reviewSummaryDummy.totalReviews}
          distance={100}
          capacity={parkingLotData.capacity}
          parkingLotType={parkingLotData.parkingLotType}
          baseIntervalMinutes={operationData.baseIntervalMinutes}
        />
        <DetailMenuButtons
          hostUuid={parkingLotData.hostUuid}
          parkingLotUuid={parkingLotUuid}
          isActive={parkingOperationDummy.isActive}
          like={parkingLotData.likeCount}
          dislike={parkingLotData.dislikeCount}
          baseFee={operationData.baseFee}
          baseIntervalMinutes={operationData.baseIntervalMinutes}
        />
        <ParkingDetailTabBar />
        <ParkingDetailContent
          mainAddress={parkingLotData.address}
          parkingLotUuid={parkingLotUuid}
          extraInfo={parkingLotData.extraInfo}
          imageUrls={parkingLotData.imageUrls}
          options={parkingLotData.options}
          evChargeTypes={parkingLotData.evChargeTypes}
          parkingSpotTypes={parkingLotData.parkingSpotTypes}
          latitude={parkingLotData.latitude}
          longitude={parkingLotData.longitude}
        />
      </main>
    </>
  );
}
