import React from 'react';

export default function AmountInfo({
  type = 'default',
  baseFee,
  baseIntervalMinutes,
  totalTime,
}: {
  type?: 'default' | 'total';
  baseFee?: number;
  baseIntervalMinutes?: number;
  totalTime?: number;
}) {
  return (
    <div>
      {type === 'total' && (
        <p className="font-semibold">
          총 결제금액: <span className="text-lg">18,000원</span>
        </p>
      )}
      <p className="font-semibold">
        3,000원
        <span className="ml-1 text-gray-2 text-sm">/30분</span>
      </p>
    </div>
  );
}
