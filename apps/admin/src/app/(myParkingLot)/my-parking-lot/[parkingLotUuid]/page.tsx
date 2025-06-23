import { getParkingLotById } from '@/actions/parking/parking-service';
import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import InfoWithThumbnail from '@/components/pages/myParkingLot/settings/InfoWithThumbnail';
import ParkingInfoEditForm from '@/components/pages/myParkingLot/settings/ParkingInfoEditForm';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';

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

  const parkingLotData = res.data;
  if (!parkingLotData) return fallback;

  return (
    <>
      <PageHeader
        title="주차장 관리 페이지"
        //   isShadow={false}
      />
      <main className="pb-32 bg-inner-background-gray">
        <InfoWithThumbnail
          thumbImageUrl={parkingLotData.thumbnailUrl}
          name={parkingLotData.name}
          averageRating={1}
          totalReviews={1}
          capacity={parkingLotData.capacity}
          address={parkingLotData.address}
        />
        <PaddedSection className="my-4 space-y-3">
          <CommonButton variant="secondary">
            주차장 상세 페이지 바로가기
          </CommonButton>
          <ParkingInfoEditForm
            name={parkingLotData.name}
            extraInfo={parkingLotData.extraInfo}
          />
        </PaddedSection>
      </main>
    </>
  );
}
