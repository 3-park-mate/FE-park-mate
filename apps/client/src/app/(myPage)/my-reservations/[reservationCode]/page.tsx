import { getReservationDetailData } from '@/actions/reservation/reservation-service';
import PageHeader from '@/components/layouts/PageHeader';
import ReservationDetail from '@/components/pages/myPage/myReservations/ReservationDetail';

export default async function page({
  params,
}: {
  params: Promise<{ reservationCode: string }>;
}) {
  const fallback = <div>예약 정보를 찾을 수 없습니다.</div>;

  const { reservationCode } = await params;
  if (!reservationCode) return fallback;
  console.log('reservationCode:', reservationCode);

  const res = await getReservationDetailData(reservationCode);
  if (!res.success) return fallback;

  const reservationData = res.data;
  if (!reservationData) return fallback;

  return (
    <>
      <PageHeader className="bg-inner-background-gray" title="예약 상세" />
      <main className="pb-32 ">
        <ReservationDetail />
      </main>
    </>
  );
}
