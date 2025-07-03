import PageHeader from '@/components/layouts/PageHeader';
import CarSelectionSection from '@/components/pages/payment/CarSelectionSection';
import ReservationOrderInfo from '@/components/pages/payment/ReservationOrderInfo';
import OrderSummarySection from '@/components/pages/payment/OrderSummarySection';
import PaymentButton from '@/components/pages/payment/PaymentButton';
import PaymentMethodSection from '@/components/pages/payment/PaymentMethodSection';
import { getReservationDetailData } from '@/actions/reservation/reservation-service';
import { notFound } from 'next/navigation';
import { getParkingLotOverviewById } from '@/actions/parking/parking-service';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    reservationCode: string;
  }>;
}) {
  const { reservationCode } = await searchParams;

  const res = await getReservationDetailData(reservationCode);
  if (
    !res.success ||
    res.data === null
    // || res.data.status != 'WAITING'
  )
    notFound();

  const reservationData = res.data;

  const overviewRes = await getParkingLotOverviewById(
    reservationData.parkingLotUuid
  );
  if (!overviewRes.success || res.data === null) notFound();

  const overviewData = overviewRes.data;

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
        />
        <CarSelectionSection vehicleNumber={reservationData.vehicleNumber} />
        <PaymentMethodSection />
        <OrderSummarySection />
        <PaymentButton />
      </main>
    </div>
  );
}
