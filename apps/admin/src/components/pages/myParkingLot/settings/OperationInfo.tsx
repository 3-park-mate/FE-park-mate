'use client';
import { OperationDataType } from '@/types/parkingDataTypes';
import { formatDateParts, formatTimeENUtils } from '@/utils/datetimeUtils';

export default function OperationInfo({
  operation,
  selectedDate,
}: {
  operation: OperationDataType | null;
  selectedDate: Date | undefined;
}) {
  return (
    <div className="bg-inner-background-gray rounded-xl p-4">
      {selectedDate && (
        <p className="text-sm font-medium mb-3">
          {formatDateParts(selectedDate.toString()).date}
        </p>
      )}
      {operation ? (
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-gray-500">운영 시간</dt>
          <dd className="text-right font-medium">
            {formatTimeENUtils(operation.validStartTime)} ~{' '}
            {formatTimeENUtils(operation.validEndTime)}
          </dd>

          <dt className="text-gray-500">기본 요금</dt>
          <dd className="text-right font-medium">
            <span className="text-secondary font-semibold">
              {operation.baseIntervalMinutes}분
            </span>
            당{' '}
            <span className="text-secondary font-semibold">
              {operation.baseFee.toLocaleString()}원
            </span>
          </dd>

          <dt className="text-gray-500">초과 요금</dt>
          <dd className="text-right font-medium">
            <span className="text-secondary font-semibold">
              {operation.extraIntervalMinutes}분
            </span>
            당{' '}
            <span className="text-secondary font-semibold">
              {operation.extraFee.toLocaleString()}원
            </span>
          </dd>

          <dt className="text-gray-500">할인율</dt>
          <dd className="text-right font-medium">{operation.discountRate}%</dd>

          <div className="col-span-2 border-t border-gray-1 my-2" />

          <dt className="text-gray-500">합산 단가</dt>
          <dd className="text-right text-lg font-bold">
            {(operation.baseFee + operation.extraFee).toLocaleString()}원
          </dd>
        </dl>
      ) : (
        <p className="text-sm text-gray-500">등록된 운영 정보가 없습니다.</p>
      )}
    </div>
  );
}
