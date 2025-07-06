import PageHeader from '@/components/layouts/PageHeader';
import CarInfoSection from '@/components/pages/payment/CarInfoSection';
import ReservationOrderInfo from '@/components/pages/payment/ReservationOrderInfo';
import { getReservationDetailData } from '@/actions/reservation/reservation-service';
import { notFound } from 'next/navigation';
import { getParkingLotOverviewById } from '@/actions/parking/parking-service';
import { getUserPointData } from '@/actions/user/user-service';
import PaymentCheckout from '@/components/pages/payment/PaymentCheckout';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    reservationCode: string;
  }>;
}) {
  const { reservationCode } = await searchParams;

  const res = await getReservationDetailData(reservationCode);
  if (!res.success || res.data === null || res.data.status != 'WAITING')
    notFound();

  const session = await getServerSession(options);
  if (!session) return notFound();
  const userUuid = session.user.uuid;

  const reservationData = res.data;

  const [overviewRes, userPointRes] = await Promise.all([
    getParkingLotOverviewById(reservationData.parkingLotUuid),
    getUserPointData(),
  ]);

  if (!overviewRes.success || !overviewRes.data) notFound();
  if (!userPointRes.success || !userPointRes.data) notFound();

  const overviewData = overviewRes.data;
  const userPointData = userPointRes.data;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="결제" />
      <main className="flex-1 bg-inner-background-gray space-y-4 pb-16">
        <ReservationOrderInfo
          parkingLotName={overviewData.name}
          address={overviewData.mainAddress}
          entryTime={reservationData.entryTime}
          exitTime={reservationData.exitTime}
          amount={30000}
          thumbnailUrl={overviewData.thumbnailUrl}
        />
        <CarInfoSection vehicleNumber={reservationData.vehicleNumber} />
        <PaymentCheckout
          point={userPointData.point}
          amount={reservationData.amount}
          userUuid={userUuid}
        />
      </main>
    </div>
  );
}
