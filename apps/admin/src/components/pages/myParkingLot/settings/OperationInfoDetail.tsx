'use client';

import { OperationDataType } from '@/types/parkingDataTypes';
import { formatTimeENUtils } from '@/utils/datetimeUtils';
import { cn } from '@repo/ui/lib/utils';

const InfoItem = ({
  label,
  value,
  isLargeAndBold = false,
}: {
  label: string;
  value: React.ReactNode;
  isLargeAndBold?: boolean;
}) => {
  return (
    <>
      <dt className="col-span-1 text-gray-500">{label}</dt>
      <dd
        className={`col-span-3 text-right ${isLargeAndBold ? 'text-lg font-bold' : 'font-medium'}`}
      >
        {value}
      </dd>
    </>
  );
};

export default function OperationInfoDetail({
  operation,
}: {
  operation: OperationDataType;
}) {
  const discountedFee = Math.floor(
    operation.baseFee * (1 - operation.discountRate / 100)
  );

  return (
    <dl className="grid grid-cols-4 gap-y-2 text-sm">
      <InfoItem
        label="운영 시간"
        value={`${formatTimeENUtils(operation.validStartTime)} ~ ${formatTimeENUtils(operation.validEndTime)}`}
      />
      <InfoItem label="할인율" value={`${operation.discountRate}%`} />
      <InfoItem
        label="기본 요금"
        value={
          <>
            <div>
              <span className="text-secondary font-semibold">
                {operation.baseIntervalMinutes}분
              </span>
              당{' '}
              <span
                className={cn(
                  'text-secondary font-semibold',
                  operation.discountRate > 0 && 'line-through text-gray-3'
                )}
              >
                {operation.baseFee.toLocaleString()}원
              </span>
            </div>
            {operation.discountRate > 0 && (
              <div className="text-gray-3">
                →
                <span className="ml-1 text-secondary font-semibold">
                  {discountedFee.toLocaleString()}원
                </span>{' '}
                <span className="text-xs">
                  ({operation.discountRate}% 할인)
                </span>
              </div>
            )}
          </>
        }
      />
      <InfoItem
        label="초과 요금"
        value={
          <>
            <span className="text-secondary font-semibold">
              {operation.extraIntervalMinutes}분
            </span>
            당{' '}
            <span className="text-secondary font-semibold">
              {operation.extraFee.toLocaleString()}원
            </span>
          </>
        }
      />
    </dl>
  );
}
