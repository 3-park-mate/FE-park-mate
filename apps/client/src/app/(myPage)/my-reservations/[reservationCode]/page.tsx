import PageHeader from '@/components/layouts/PageHeader';
import ReservationDetail from '@/components/pages/myPage/myReservations/ReservationDetail';

export default async function page({
  params,
}: {
  params: Promise<{ reservationCode: string }>;
}) {
  const { reservationCode } = await params;

  return (
    <>
      <PageHeader />
      <main className="pb-32 ">
        <ReservationDetail />
      </main>
    </>
  );
}
