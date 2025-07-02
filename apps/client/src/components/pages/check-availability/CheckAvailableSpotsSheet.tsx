'use client';

import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Sheet } from '@repo/ui/components/base/sheet';
import { useState } from 'react';
import AmountInfo from './AmountInfo';
import CheckAvailableSpotsTrigger from './CheckAvailableSpotsTrigger';
import CheckAvailableSpotsContent, {
  AvailableSpotsResponseType,
} from './CheckAvailableSpotsContent';
import { ScheduleType } from '@/types/initialDataTypes';

export default function CheckAvailableSpotsSheet({
  parkingLotUuid,
  schedule,
}: {
  parkingLotUuid: string;
  schedule: ScheduleType;
}) {
  const [availableSpots, setAvailableSpots] =
    useState<AvailableSpotsResponseType | null>(null);

  return (
    <Sheet key="bottom">
      <ButtonWrapper className="flex items-center justify-between border-t-1 pt-4 bg-white">
        <AmountInfo />
        <CheckAvailableSpotsTrigger
          parkingLotUuid={parkingLotUuid}
          schedule={schedule}
          onFetch={setAvailableSpots}
        />
      </ButtonWrapper>
      <CheckAvailableSpotsContent
        schedule={schedule}
        availableSpots={availableSpots}
      />
    </Sheet>
  );
}
