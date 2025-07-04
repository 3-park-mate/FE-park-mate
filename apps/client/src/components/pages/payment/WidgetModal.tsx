'use client';
import {
  GlobalContainerView,
  HeaderLayout,
} from '@repo/ui/components/common/CommonLayouts';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import TossPaymentWidget from './TossPaymentWidget';
import { PaymentType } from '@/types/reservationDataTypes';

export default function WidgetModal({
  isOpen,
  onClose,
  amount,
  paymentType,
  userUuid,
}: {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  paymentType: PaymentType;
  userUuid: string;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <GlobalContainerView className="fixed inset-0 z-50 flex flex-col bg-white outline-none">
      <HeaderLayout className="bg-white">
        <button
          onClick={onClose}
          className="absolute left-0 flex justify-center cursor-pointer"
        >
          <ChevronLeft className="ml-3" />
        </button>
        <h1 className="font-semibold">결제하기</h1>
      </HeaderLayout>
      <TossPaymentWidget
        amount={amount}
        paymentType={paymentType}
        userUuid={userUuid}
      />
    </GlobalContainerView>
  );
}
