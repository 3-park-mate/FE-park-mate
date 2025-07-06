'use client';
import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import { useState } from 'react';
import WidgetModal from './WidgetModal';
import { PaymentType } from '@/types/reservationDataTypes';

export default function PaymentButton({
  amount,
  paymentType,
  userUuid,
}: {
  amount: number;
  paymentType: PaymentType;
  userUuid: string;
}) {
  const [isOpenWidget, setIsOpentWidget] = useState(false);
  const handlePaymentClick = async () => {
    setIsOpentWidget(true);
  };

  return (
    <PaddedSection className="pt-5">
      <p className="text-13px text-gray-2 text-center break-keep pb-3">
        주문 내역을 확인하였으며,
        <br />
        서비스에 결제 정보를 제공하는 것에 동의합니다.
      </p>
      <CommonButton
        className="font-bold text-base text-black"
        onClick={handlePaymentClick}
      >
        결제하기
      </CommonButton>
      {isOpenWidget && (
        <WidgetModal
          isOpen={isOpenWidget}
          onClose={() => {
            setIsOpentWidget(false);
          }}
          amount={amount}
          paymentType={paymentType}
          userUuid={userUuid}
        />
      )}
    </PaddedSection>
  );
}
