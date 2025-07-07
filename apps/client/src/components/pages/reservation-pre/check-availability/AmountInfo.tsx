import { getCaculatedTotalAmount } from '@/actions/parking/parking-service';
import { useFetchData } from '@/hooks/useFetchData';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { ApiResponse } from '@/types/responseDataTypes';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export default function AmountInfo() {
  const { watch } = useFormContext<CreateReservationRequestType>();
  const uuid = watch('parkingLotUuid');
  const entryTime = watch('entryTime');
  const exitTime = watch('exitTime');
  const isScheduleSelected = entryTime && exitTime && uuid;

  const fetcher = useCallback((): Promise<ApiResponse<{ amount: number }>> => {
    if (!isScheduleSelected) {
      return Promise.resolve({
        success: false,
        message: '일정 정보 없음',
        data: null,
      });
    }
    return getCaculatedTotalAmount({
      parkingLotUuid: uuid,
      startDateTime: entryTime,
      endDateTime: exitTime,
    });
  }, [entryTime, exitTime, uuid, isScheduleSelected]);

  const { data } = useFetchData<{ amount: number }>(fetcher);

  return (
    <div>
      {isScheduleSelected ? (
        <>
          <p className="font-medium">총 결제금액</p>
          {data ? (
            <p className="text-2xl font-bold">
              {data?.amount.toLocaleString()}
              <span className="text-xl font-semibold mx-0.5">원</span>
            </p>
          ) : (
            <DotSpinner />
          )}
        </>
      ) : (
        <p className="leading-tight">
          일정을 선택 후<br /> 총 결제 금액을 확인하세요
        </p>
      )}
    </div>
  );
}
