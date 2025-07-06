import { getOrderDetailData } from '@/actions/order/order-service';
import { requestPaymentAction } from '@/actions/payment/payment-service';
import ReservationSuccess from '@/components/pages/payment/ReservationSuccess';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import { redirect } from 'next/navigation';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    orderCode: string;
    reservationCode: string;
    paymentKey: string;
    orderId: string;
    amount: string;
  }>;
}) {
  const { orderCode, reservationCode, paymentKey, orderId, amount } =
    await searchParams;

  if (!orderCode || !reservationCode || !paymentKey || !orderId || !amount) {
    console.error('필수 결제 파라미터 누락:', { paymentKey, orderId, amount });
    redirect('/payment/fail?message=missing_params');
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    console.error('유효하지 않은 amount 값:', amount);
    redirect('/payment/fail?message=invalid_amount');
  }

  const payload = {
    paymentKey,
    orderId,
    amount: numericAmount,
  };
  console.log('결제 승인 요청 페이로드:', payload);

  const res = await requestPaymentAction(payload);

  if (!res.success) {
    console.error('결제 승인 실패:', res.message);
    redirect(
      `/payment/fail?message=${encodeURIComponent(res.message || '결제 승인 중 오류가 발생했습니다.')}`
    );
  }

  console.log('결제 승인 성공:', res.data);

  const orderRes = await getOrderDetailData(orderCode);

  if (!orderRes.success) {
    console.error('결제 승인 실패:', orderRes.message);
    redirect(
      `/payment/fail?message=${encodeURIComponent(orderRes.message || '결제 승인 중 오류가 발생했습니다.')}`
    );
  }

  const orderData = orderRes.data;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderLayout>
        <h1 className="font-semibold">결제 완료</h1>
      </HeaderLayout>
      <main className="flex-1 flex items-center justify-center">
        <ReservationSuccess
          orderData={orderData}
          reservationCode={reservationCode}
        />
      </main>
    </div>
  );
}
