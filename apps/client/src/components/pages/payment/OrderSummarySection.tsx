import { PaddedSectionWithTitle } from '@repo/ui/components/common/CommonLayouts';

export default function OrderSummarySection({ amount }: { amount: number }) {
  return (
    <PaddedSectionWithTitle title="결제상세">
      <dl className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <dt>상품 금액</dt>
          <dd>{amount.toLocaleString()}원</dd>
        </div>
        {/* <div className="flex justify-between">
          <dt>할인 금액</dt>
          <dd className="text-red-500">-300원</dd>
        </div>
        */}
        <hr className="my-4" />
        <div className="flex justify-between">
          <dt className="font-semibold text-black">총 결제 금액</dt>
          <dd className="font-bold text-xl text-black">
            {amount.toLocaleString()}원
          </dd>
        </div>
      </dl>
    </PaddedSectionWithTitle>
  );
}
