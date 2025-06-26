import PageHeader from '@/components/layouts/PageHeader';
import OrderInfoSection from '@/components/pages/payment/OrderInfoSection';
import OrderSummarySection from '@/components/pages/payment/OrderSummarySection';
import PaymentButton from '@/components/pages/payment/PaymentButton';
import PaymentMethodSection from '@/components/pages/payment/PaymentMethodSection';

export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="결제" />
      <main className="flex-1 bg-inner-background-gray space-y-4">
        <OrderInfoSection />
        <PaymentMethodSection />
        <OrderSummarySection />
        <PaymentButton />
      </main>
    </div>
  );
}
