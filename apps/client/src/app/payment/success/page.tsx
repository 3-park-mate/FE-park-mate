import ReservationSuccess from '@/components/pages/payment/ReservationSuccess';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    paymentKey: string;
    orderId: string;
    amount: string;
  }>;
}) {
  const { paymentKey, orderId, amount } = await searchParams;

  const payload = {
    paymentKey,
    orderId,
    amount: Number(amount),
  };
  console.log(payload);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderLayout>
        <h1 className="font-semibold">결제 완료</h1>
      </HeaderLayout>
      <main className="flex-1 flex items-center justify-center">
        <ReservationSuccess />
      </main>
    </div>
  );
}
