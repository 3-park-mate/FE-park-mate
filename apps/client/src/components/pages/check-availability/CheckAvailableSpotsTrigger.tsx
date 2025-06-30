'use client';

import { SheetTrigger } from '@repo/ui/components/base/sheet';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { AvailableSpotsResponseType } from './CheckAvailableSpotsContent';
import { getAvailableSpots } from '@/actions/parking/parking-service';
import { toLocalISOString } from '@/utils/datetimeUtils';

export default function CheckAvailableSpotsTrigger({
  parkingLotUuid,
  selectedDateTime,
  onFetch,
}: {
  parkingLotUuid: string;
  selectedDateTime: {
    entryDateTime: Date | null;
    exitDateTime: Date | null;
  };
  onFetch: (data: AvailableSpotsResponseType) => void;
}) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (
      selectedDateTime.entryDateTime === null ||
      selectedDateTime.exitDateTime === null
    )
      return;
    setLoading(true);
    try {
      const res = await getAvailableSpots(
        parkingLotUuid,
        toLocalISOString(selectedDateTime.entryDateTime),
        toLocalISOString(selectedDateTime.exitDateTime)
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

  const isActive =
    selectedDateTime.entryDateTime !== null &&
    selectedDateTime.exitDateTime !== null;

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
