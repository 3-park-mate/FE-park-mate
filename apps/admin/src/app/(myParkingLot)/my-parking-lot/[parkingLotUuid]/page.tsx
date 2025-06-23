import { getParkingLotById } from '@/actions/parking/parking-service';
import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import InfoWithThumbnail from '@/components/pages/myParkingLot/settings/InfoWithThumbnail';
import ParkingInfoEditForm from '@/components/pages/myParkingLot/settings/ParkingInfoEditForm';
import ParkingOperationEdit from '@/components/pages/myParkingLot/settings/ParkingOperationEdit';
import ParkingSettingsTabBar from '@/components/pages/myParkingLot/settings/ParkingSettingsTabBar';
import ParkingSpotEdit from '@/components/pages/myParkingLot/settings/ParkingSpotEdit';
import { buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { CarFront } from 'lucide-react';
import Link from 'next/link';

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
        <PaddedLayout className="my-4">
          <Link
            href="#"
            className={`${buttonVariants({ variant: 'secondary' })} w-full h-11`}
          >
            <CarFront className="text-white fill-white" />
            파크메이트 서비스 페이지 바로가기
          </Link>
        </PaddedLayout>
        <ParkingSettingsTabBar />
        <section className="my-4 space-y-3">
          <ParkingOperationEdit />
          <ParkingInfoEditForm
            name={parkingLotData.name}
            extraInfo={parkingLotData.extraInfo}
          />
          <ParkingSpotEdit />
        </section>
      </main>
    </>
  );
}
