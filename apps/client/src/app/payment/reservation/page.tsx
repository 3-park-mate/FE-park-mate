import PageHeader from '@/components/layouts/PageHeader';
import CarInfoSection from '@/components/pages/payment/CarInfoSection';
import ReservationOrderInfo from '@/components/pages/payment/ReservationOrderInfo';
import OrderSummarySection from '@/components/pages/payment/OrderSummarySection';
import PaymentButton from '@/components/pages/payment/PaymentButton';
import PaymentMethodSection from '@/components/pages/payment/PaymentMethodSection';

export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="결제" />
      <main className="flex-1 bg-inner-background-gray space-y-4 pb-16">
        <ReservationOrderInfo />
        <CarInfoSection />
        <PaymentMethodSection />
        <OrderSummarySection />
        <PaymentButton />
      </main>
    </div>
  );
}
