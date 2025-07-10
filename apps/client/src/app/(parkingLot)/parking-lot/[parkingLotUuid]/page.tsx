import PageHeader from '@/components/layouts/PageHeader';
import InfoWithThumbnail from '@/components/pages/parkingLot/InfoWithThumbnail';
import DetailMenuButtons from '@/components/pages/parkingLot/DetailMenuButtons';
import ParkingDetailContent from '@/components/pages/parkingLot/ParkingDetailContent';
import {
  getDailyOperationById,
  getParkingLotById,
} from '@/actions/parking/parking-service';
import ParkingDetailTabBar from '@/components/pages/parkingLot/ParkingDetailTabBar';
import NotFoundLayout from '@/components/common/NotFoundLayout';
import { getReviewSummaryData } from '@/actions/review/review-service';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = (
    <NotFoundLayout
      heading="주차장이 존재하지 않습니다."
      subheading="잘못된 url 접근이 아닌지 확인해 주세요."
      buttonHref="/"
    />
  );

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;

  const [parkingLotRes, operationRes, reviewSummaryRes] = await Promise.all([
    getParkingLotById(parkingLotUuid),
    getDailyOperationById(parkingLotUuid),
    getReviewSummaryData(parkingLotUuid),
  ]);

  if (
    !parkingLotRes.success ||
    !operationRes.success ||
    !parkingLotRes.data ||
    !reviewSummaryRes.success
  ) {
    return fallback;
  }

  const parkingLotData = parkingLotRes.data;
  const operationData = operationRes.data;
  const reviewSummaryData = reviewSummaryRes.data;
  console.log(reviewSummaryData);

  return (
    <>
      <PageHeader title={parkingLotData.name} isShadow={false} />
      <main className="pb-32 bg-inner-background-gray">
        <InfoWithThumbnail
          parkingLotUuid={parkingLotUuid}
          thumbImageUrl={parkingLotData.thumbnailUrl}
          baseFee={operationData?.baseFee}
          name={parkingLotData.name}
          averageRating={reviewSummaryData.averageRating}
          totalReviews={reviewSummaryData.totalReviews}
          capacity={parkingLotData.capacity}
          parkingLotType={parkingLotData.parkingLotType}
          baseIntervalMinutes={operationData?.baseIntervalMinutes}
        />
        <DetailMenuButtons
          parkingLotUuid={parkingLotUuid}
          like={parkingLotData.likeCount}
          dislike={parkingLotData.dislikeCount}
          baseFee={operationData?.baseFee}
          baseIntervalMinutes={operationData?.baseIntervalMinutes}
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
          totalReviews={reviewSummaryData.totalReviews}
        />
      </main>
    </>
  );
}
