import PageHeader from '@/components/layouts/PageHeader';
import MyReservationListSection from '@/components/pages/myPage/myReservations/MyReservationListSection';

export default function page() {
  return (
    <>
      <PageHeader title="예약 내역" />
      <main>
        <MyReservationListSection />
      </main>
    </>
  );
}
