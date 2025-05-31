import PageHeader from '@/components/layouts/PageHeader';
import DetailInfoSection from '@/components/pages/parkingLot/DetailInfoSection';
import DetailInfoMenuSection from '@/components/pages/parkingLot/DetailInfoMenuSection';

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
        <DetailInfoMenuSection />
      </main>
    </>
  );
}
