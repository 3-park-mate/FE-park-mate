import PageHeader from '@/components/layouts/PageHeader';
import DetailInfoSection from '@/components/pages/parkingLot/DetailInfoSection';
import ReservationSection from '@/components/pages/parkingLot/ReservationSection';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const { parkingLotUuid } = await params;

  return (
    <>
      <PageHeader title="주차장 이름" />
      <main>
        <DetailInfoSection />
        <ReservationSection />
      </main>
    </>
  );
}
