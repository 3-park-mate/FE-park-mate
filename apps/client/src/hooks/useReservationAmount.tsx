import { useCallback } from 'react';
import { getCaculatedTotalAmount } from '@/actions/parking/parking-service';
import { useFetchData } from '@/hooks/useFetchData';
import { useFormContext } from 'react-hook-form';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { ApiResponse } from '@/types/responseDataTypes';

export function useReservationAmount() {
  const { watch } = useFormContext<CreateReservationRequestType>();
  const parkingLotUuid = watch('parkingLotUuid');
  const entryTime = watch('entryTime');
  const exitTime = watch('exitTime');

  const isScheduleSelected = !!(entryTime && exitTime && parkingLotUuid);

  const fetcher = useCallback((): Promise<ApiResponse<{ amount: number }>> => {
    if (!isScheduleSelected) {
      return Promise.resolve({
        success: false,
        message: '일정 정보 없음',
        data: null,
      });
    }
    return getCaculatedTotalAmount({
      parkingLotUuid,
      startDateTime: entryTime,
      endDateTime: exitTime,
    });
  }, [entryTime, exitTime, parkingLotUuid, isScheduleSelected]);

  const { data, loading, error, refetch } = useFetchData(fetcher);

  return {
    amount: data?.amount,
    loading,
    error,
    isScheduleSelected,
    refetch,
  };
}
