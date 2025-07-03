import { PaddedSectionWithTitle } from '@repo/ui/components/common/CommonLayouts';
import {
  RadioGroup,
  RadioGroupItem,
} from '@repo/ui/components/base/radio-group';
import { Button } from '@repo/ui/components/base/button';

export default function PaymentMethodSection({
  userPoint,
}: {
  userPoint: number;
}) {
  return (
    <PaddedSectionWithTitle title="결제수단">
      <RadioGroup defaultValue="point">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="point" id="payment-method-point" />
          <label htmlFor="payment-method-point">포인트 결제</label>
        </div>

        <div className="ms-6.5 flex justify-between items-center bg-white px-5 py-3 rounded-lg border border-primary shadow-sm">
          <div>
            <p className="text-gray-3 text-sm">보유 포인트</p>
            <h2 className="text-xl font-semibold">
              {userPoint.toLocaleString()}원
            </h2>
          </div>
          <Button>충전</Button>
        </div>

        <hr className="my-2" />
        <div className="flex items-center gap-3">
          <RadioGroupItem value="card" id="payment-method-card" />
          <label htmlFor="payment-method-card">카드 결제</label>
        </div>
      </RadioGroup>
    </PaddedSectionWithTitle>
  );
}
