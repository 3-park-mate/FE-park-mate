import PaymentFail from '@/components/pages/payment/PaymentFail';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    message: string;
    code: string;
  }>;
}) {
  const { message, code } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderLayout>
        <h1 className="font-semibold">결제 실패</h1>
      </HeaderLayout>
      <main className="flex-1 flex items-center justify-center">
        <PaymentFail />
      </main>
    </div>
  );
}
