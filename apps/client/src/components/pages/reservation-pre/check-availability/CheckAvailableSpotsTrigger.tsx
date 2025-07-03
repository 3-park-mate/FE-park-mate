'use client';

import { SheetTrigger } from '@repo/ui/components/base/sheet';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
import { getAvailableSpots } from '@/actions/parking/parking-service';
import { toLocalISOString } from '@/utils/datetimeUtils';
import { ScheduleType } from '@/types/initialDataTypes';
import { AvailableSpotsResponseType } from '@/types/parkingDataTypes';

export default function CheckAvailableSpotsTrigger({
  parkingLotUuid,
  schedule,
  onFetch,
}: {
  parkingLotUuid: string;
  schedule: ScheduleType;
  onFetch: (data: AvailableSpotsResponseType) => void;
}) {
  const [loading, setLoading] = useState(false);
  const { entryDateTime, exitDateTime } = schedule;
  const handleClick = async () => {
    if (entryDateTime === null || exitDateTime === null) return;
    setLoading(true);
    try {
      const res = await getAvailableSpots(
        parkingLotUuid,
        toLocalISOString(entryDateTime),
        toLocalISOString(exitDateTime)
      );

      if (res.success) {
        onFetch(res.data);
      } else {
        console.error('API 실패:', res.message);
        onFetch({});
      }
    } catch (err) {
      console.error('잔여 주차면 조회 실패:', err);
      onFetch({});
    } finally {
      setLoading(false);
    }
  };

  const isActive = entryDateTime !== null && exitDateTime !== null;

  return (
    <SheetTrigger asChild>
      <Button
        onClick={handleClick}
        disabled={!isActive || loading}
        className={cn('h-12 text-md', isActive ? 'bg-primary' : 'bg-gray-1')}
      >
        예약 가능 주차면 확인
      </Button>
    </SheetTrigger>
  );
}
