'use client';

import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Sheet } from '@repo/ui/components/base/sheet';
import { useMemo, useState } from 'react';
import AmountInfo from './AmountInfo';
import CheckAvailableSpotsTrigger from './CheckAvailableSpotsTrigger';
import CheckAvailableSpotsContent, {
  AvailableSpotsResponseType,
} from './CheckAvailableSpotsContent';
import { combineDateAndTime } from '@/utils/datetimeUtils';
import { DateRange } from 'react-day-picker';

export default function CheckAvailableSpotsSheet({
  parkingLotUuid,
  dateRange,
  timeRange,
}: {
  parkingLotUuid: string;
  dateRange: DateRange | undefined;
  timeRange: { entryTime: string; exitTime: string };
}) {
  const [availableSpots, setAvailableSpots] =
    useState<AvailableSpotsResponseType | null>(null);

  const selectedDateTime = useMemo(() => {
    if (
      dateRange?.from &&
      dateRange.to &&
      timeRange.entryTime &&
      timeRange.exitTime
    ) {
      return {
        entryDateTime: combineDateAndTime(dateRange.from, timeRange.entryTime),
        exitDateTime: combineDateAndTime(dateRange.to, timeRange.exitTime),
      };
    }
    return {
      entryDateTime: null,
      exitDateTime: null,
    };
  }, [dateRange, timeRange]);

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
