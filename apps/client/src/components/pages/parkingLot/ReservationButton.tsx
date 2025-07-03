import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import React from 'react';

export default function ReservationButton({
  parkingLotUuid,
  baseFee,
  baseIntervalMinutes,
}: {
  parkingLotUuid: string;
  baseFee?: number;
  baseIntervalMinutes?: number;
}) {
  const intervalText =
    baseIntervalMinutes === 60 ? '1시간' : `${baseIntervalMinutes}분`;

  return (
    <>
      {baseFee && baseIntervalMinutes ? (
        <AlwaysVisibleTooltip
          side="bottom"
          content={`${intervalText} ${baseFee.toLocaleString()}원`}
        >
          <CommonButton
            className="bg-primary"
            disabled={!baseFee || !baseIntervalMinutes}
          >
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
