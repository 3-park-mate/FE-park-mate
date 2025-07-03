import { getParkingLotById } from '@/actions/parking/parking-service';
import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import InfoWithThumbnail from '@/components/pages/myParkingLot/settings/InfoWithThumbnail';
import ParkingInfoEditForm from '@/components/pages/myParkingLot/settings/ParkingInfoEditForm';
import ParkingOperationEdit from '@/components/pages/myParkingLot/settings/ParkingOperationEdit';
import ParkmateLinkButton from '@/components/pages/myParkingLot/settings/ParkmateLinkButton';
import ParkingSettingsTabBar from '@/components/pages/myParkingLot/settings/ParkingSettingsTabBar';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
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

  const res = await getParkingLotById(parkingLotUuid);
  if (!res.success) return fallback;

  const [parkingLotRes, reviewSummaryRes] = await Promise.all([
    getParkingLotById(parkingLotUuid),
    getReviewSummaryData(parkingLotUuid),
  ]);

  if (
    !parkingLotRes.success ||
    !parkingLotRes.data ||
    !reviewSummaryRes.success
  ) {
    return fallback;
  }

  const parkingLotData = parkingLotRes.data;
  const reviewSummaryData = reviewSummaryRes.data;

  const session = await getServerSession(options);
  if (session?.user.uuid != parkingLotData.hostUuid) return fallback;

  return (
    <>
      <PageHeader title="주차장 관리 페이지" />
      <main className="pb-32 bg-inner-background-gray">
        <InfoWithThumbnail
          thumbImageUrl={parkingLotData.thumbnailUrl}
          name={parkingLotData.name}
          averageRating={reviewSummaryData.averageRating}
          totalReviews={reviewSummaryData.totalReviews}
          capacity={parkingLotData.capacity}
          address={parkingLotData.address}
        />
        <ParkmateLinkButton />
        <ParkingSettingsTabBar />
        <section className="my-4 space-y-3">
          <ParkingOperationEdit parkingLotUuid={parkingLotUuid} />
          <ParkingInfoEditForm
            name={parkingLotData.name}
            extraInfo={parkingLotData.extraInfo}
          />
        </section>
      </main>
    </>
  );
}
