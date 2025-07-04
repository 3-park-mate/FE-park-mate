'use client';

import { PaymentType } from '@/types/reservationDataTypes';
import OrderSummarySection from './OrderSummarySection';
import PaymentButton from './PaymentButton';
import PaymentMethodSection from './PaymentMethodSection';
import { useState } from 'react';

export default function PaymentCheckout({
  point,
  amount,
  userUuid,
}: {
  point: number;
  amount: number;
  userUuid: string;
}) {
  const [paymentType, setPaymentType] = useState<PaymentType>('POINT');

  return (
    <>
      <PaymentMethodSection
        userPoint={point}
        paymentType={paymentType}
        onChange={setPaymentType}
      />
      <OrderSummarySection amount={amount} />
      <PaymentButton
        amount={amount}
        paymentType={paymentType}
        userUuid={userUuid}
      />
    </>
  );
}
