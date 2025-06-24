import { getReservationsData } from '@/actions/reservation/reservation-service';
import PageHeader from '@/components/layouts/PageHeader';
import MyReservationListSection from '@/components/pages/myPage/myReservations/MyReservationListSection';

export default async function page() {
  const res = await getReservationsData({ size: 10 });
  if (!res.success) return;

  console.log(res.data);
  const reservations = res.data.content;

  return (
    <>
      <PageHeader title="예약 내역" />
      <main>
        <MyReservationListSection reservations={reservations} />
      </main>
    </>
  );
}
