import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import React from 'react';

export default function ReservationButton({
  parkingLotUuid,
  isActive,
  baseFee,
  baseIntervalMinutes,
}: {
  parkingLotUuid: string;
  isActive: boolean;
  baseFee: number;
  baseIntervalMinutes: number;
}) {
  const intervalText =
    baseIntervalMinutes === 60 ? '1시간' : `${baseIntervalMinutes}분`;

  return (
    <>
      {isActive ? (
        <AlwaysVisibleTooltip
          side="bottom"
          content={`${intervalText} ${baseFee.toLocaleString()}원`}
        >
          <CommonButton className="bg-primary" disabled={!isActive}>
            예약하기
          </CommonButton>
        </AlwaysVisibleTooltip>
      ) : (
        <CommonButton className="bg-primary" disabled>
          운영 준비중
        </CommonButton>
      )}
    </>
  );
}
