import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import React from 'react';

export default function ReservationButton({
  parkingLotUuid,
  isActive,
  baseFee,
  availableSpots,
  registeredParkingCount,
}: {
  parkingLotUuid: string;
  isActive: boolean;
  baseFee: number;
  availableSpots: number;
  registeredParkingCount: number;
}) {
  return (
    <>
      {isActive ? (
        <AlwaysVisibleTooltip
          side="bottom"
          content={`1시간 ${baseFee.toLocaleString()}원`}
        >
          <CommonButton className="bg-primary-dark" disabled={!isActive}>
            예약하기 ({availableSpots}/{registeredParkingCount})
          </CommonButton>
        </AlwaysVisibleTooltip>
      ) : (
        <CommonButton className="bg-primary-dark" disabled>
          운영 준비중
        </CommonButton>
      )}
    </>
  );
}
