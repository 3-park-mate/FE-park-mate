import { getOrderDataByCode } from '@/actions/order/order-service';
import { getParkingLotOverviewById } from '@/actions/parking/parking-service';
import { getReservationDetailData } from '@/actions/reservation/reservation-service';
import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import ReservationDetail from '@/components/pages/myPage/myReservations/ReservationDetail';

export default async function page({
  params,
}: {
  params: Promise<{ reservationCode: string }>;
}) {
  const fallback = (
    <NotFoundLayout
      heading="예약 정보가 존재하지 않습니다."
      subheading="잘못된 url 접근이 아닌지 확인해 주세요."
      buttonHref="/"
    />
  );

  const { reservationCode } = await params;
  if (!reservationCode) return fallback;

  const [resDetail, resOrder] = await Promise.all([
    getReservationDetailData(reservationCode),
    getOrderDataByCode(reservationCode),
  ]);

  if (!resDetail.success) return fallback;
  const reservationData = resDetail.data;
  if (!reservationData) return fallback;

  if (!resOrder.success) return fallback;
  const orderData = resOrder.data;

  const overviewRes = await getParkingLotOverviewById(
    reservationData.parkingLotUuid
  );
  if (!overviewRes.success) return fallback;
  const overviewData = overviewRes.data;
  if (!overviewData) return fallback;

  return (
    <>
      <PageHeader className="bg-inner-background-gray" title="예약 상세" />
      <main className="pb-32 ">
        <ReservationDetail
          reservationData={reservationData}
          overviewData={overviewData}
          orderData={orderData}
        />
      </main>
    </>
  );
}
