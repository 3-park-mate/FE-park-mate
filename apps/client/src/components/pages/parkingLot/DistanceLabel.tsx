'use client';

import { getParkingLotDistance } from '@/actions/parking/parking-service';
import { useFetchData } from '@/hooks/useFetchData';
import { useLocationStore } from '@/store/useLocationStore';
import { IconWithText } from '@repo/ui/components/common/CommonLayouts';
import { MapPin } from 'lucide-react';
import { useCallback } from 'react';
import { ApiResponse } from '@/types/responseDataTypes';

export default function DistanceLabel({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const { latitude, longitude } = useLocationStore();

  const fetcher = useCallback((): Promise<
    ApiResponse<{ distance: number }>
  > => {
    if (latitude == null || longitude == null) {
      return Promise.resolve({
        success: false,
        message: '위치 정보 없음',
        data: null,
      } as ApiResponse<{ distance: number }>);
    }
    return getParkingLotDistance({ parkingLotUuid, latitude, longitude });
  }, [latitude, longitude, parkingLotUuid]);

  const { data } = useFetchData<{ distance: number }>(fetcher);

  if (data?.distance == null) return null;

  return <IconWithText Icon={MapPin}>{data.distance}m</IconWithText>;
}
