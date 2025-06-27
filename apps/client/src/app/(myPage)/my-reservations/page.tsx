import PageHeader from '@/components/layouts/PageHeader';
import MyReservationListSection from '@/components/pages/myPage/myReservations/MyReservationListSection';

export default async function page() {
  return (
    <>
      <PageHeader title="예약 내역" />
      <main className="">
        <MyReservationListSection />
      </main>
    </>
  );
}
