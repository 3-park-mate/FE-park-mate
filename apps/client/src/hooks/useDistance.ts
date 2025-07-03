import { useFetchData } from '@/hooks/useFetchData';
import { useLocationStore } from '@/store/useLocationStore';
import { useCallback } from 'react';
import { ApiResponse } from '@/types/responseDataTypes';
import { getParkingLotDistance } from '@/actions/parking/parking-service';

export function useDistance(parkingLotUuid: string): number | null {
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

  return data?.distance ?? null;
}
