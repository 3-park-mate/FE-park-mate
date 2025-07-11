import { getParkingLotById } from '@/actions/parking/parking-service';
import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import ReservationForm from '@/components/pages/reservation-pre/ReservationForm';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const { parkingLotUuid } = await params;

  if (!parkingLotUuid)
    return (
      <NotFoundLayout
        heading="주차장 정보가 존재하지 않습니다."
        subheading="잘못된 url 접근이 아닌지 확인해 주세요."
        buttonHref="/"
      />
    );

  const res = await getParkingLotById(parkingLotUuid);
  if (!res.success)
    return (
      <NotFoundLayout
        heading="주차장 정보를 불러올 수 없습니다."
        subheading="예약을 다시 진행해주세요."
        buttonHref="/"
      />
    );

  const parkingLotData = res.data;
  if (!parkingLotData)
    return (
      <NotFoundLayout
        heading="주차장 정보를 불러올 수 없습니다."
        subheading="예약을 다시 진행해주세요."
        buttonHref="/"
      />
    );

  return (
    <>
      <PageHeader title={parkingLotData.name} />
      <main>
        <PaddedLayout>
          <ReservationForm
            parkingLotUuid={parkingLotUuid}
            parkingLotData={parkingLotData}
          />
        </PaddedLayout>
      </main>
    </>
  );
}
