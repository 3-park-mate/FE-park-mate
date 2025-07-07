import { OrderDetailDataType } from '@/types/orderDataTypes';
import { formatDate } from '@/utils/datetimeUtils';
import InfoRow from '@repo/ui/components/common/CommonLayouts';

export default function OrderInfoSection({
  orderData,
}: {
  orderData: OrderDetailDataType;
}) {
  return (
    <section className="space-y-1">
      <p className="text-gray-2 text-15px">주문정보</p>
      <div className="space-y-1 bg-gray-light-1 rounded-lg p-4">
        <p className="text-sm text-gray-2">{formatDate(orderData.timestamp)}</p>
        <p className="text-22px font-bold">
          {orderData.amount.toLocaleString()}원
        </p>
        <hr className="my-3" />
        <InfoRow label="결제코드">{orderData.orderCode}</InfoRow>
        <InfoRow label="결제구분">{orderData.paymentType}</InfoRow>
        <InfoRow label="상태">결제완료</InfoRow>
        {/* <InfoRow label="취소일자">2025.00.00 | 14:00</InfoRow>
        <InfoRow label="취소사유">단순변심</InfoRow> */}
      </div>
    </section>
  );
}
