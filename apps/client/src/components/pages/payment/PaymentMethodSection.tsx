import { PaddedSectionWithTitle } from '@repo/ui/components/common/CommonLayouts';
import {
  RadioGroup,
  RadioGroupItem,
} from '@repo/ui/components/base/radio-group';
import { Button } from '@repo/ui/components/base/button';
import { PaymentType } from '@/types/reservationDataTypes';

export default function PaymentMethodSection({
  userPoint,
  paymentType,
  onChange,
}: {
  userPoint: number;
  paymentType: PaymentType;
  onChange: (method: PaymentType) => void;
}) {
  return (
    <PaddedSectionWithTitle title="결제수단">
      <RadioGroup
        defaultValue={paymentType}
        onValueChange={(val) => onChange(val as PaymentType)}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="POINT" id="payment-method-point" />
          <label htmlFor="payment-method-point">포인트 결제</label>
        </div>

        {paymentType === 'POINT' && (
          <div className="ms-6.5 flex justify-between items-center bg-white px-5 py-3 rounded-lg border border-primary shadow-sm">
            <div>
              <p className="text-gray-3 text-sm">보유 포인트</p>
              <h2 className="text-xl font-semibold">
                {userPoint.toLocaleString()}원
              </h2>
            </div>
            <Button>충전</Button>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex items-center gap-3">
          <RadioGroupItem value="PG" id="payment-method-pg" />
          <label htmlFor="payment-method-pg">일반 결제</label>
        </div>
      </RadioGroup>
    </PaddedSectionWithTitle>
  );
}
