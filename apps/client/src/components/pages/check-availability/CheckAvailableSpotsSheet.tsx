'use client';

import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Sheet } from '@repo/ui/components/base/sheet';
import { useState } from 'react';
import AmountInfo from './AmountInfo';
import CheckAvailableSpotsTrigger from './CheckAvailableSpotsTrigger';
import CheckAvailableSpotsContent, {
  AvailableSpotsResponseType,
} from './CheckAvailableSpotsContent';

export default function CheckAvailableSpotsSheet({
  parkingLotUuid,

  selectedDateTime,
}: {
  parkingLotUuid: string;

  selectedDateTime: { entryDateTime: Date | null; exitDateTime: Date | null };
}) {
  const [availableSpots, setAvailableSpots] =
    useState<AvailableSpotsResponseType | null>(null);

  return (
    <Sheet key="bottom">
      <ButtonWrapper className="flex items-center justify-between border-t-1 pt-4 bg-white">
        <AmountInfo />
        <CheckAvailableSpotsTrigger
          parkingLotUuid={parkingLotUuid}
          selectedDateTime={selectedDateTime}
          onFetch={setAvailableSpots}
        />
      </ButtonWrapper>
      <CheckAvailableSpotsContent
        selectedDateTime={selectedDateTime}
        availableSpots={availableSpots}
      />
    </Sheet>
  );
}
