import { getParkingLotById } from '@/actions/parking/parking-service';
import PageHeader from '@/components/layouts/PageHeader';
import ReservationForm from '@/components/pages/reservation-pre/ReservationForm';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = <div>주차장을 찾을 수 없습니다.</div>;

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;
  const res = await getParkingLotById(parkingLotUuid);
  if (!res.success) return fallback;

  const parkingLotData = res.data;
  if (!parkingLotData) return fallback;

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
