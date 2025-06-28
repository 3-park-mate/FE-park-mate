'use client';

import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import SelectScheduleSection from './SelectScheduleSection';
import { useFetchData } from '@/hooks/useFetchData';
import { OperationsInfo } from '@/types/parkingDataTypes';
import { getOperationsById } from '@/actions/parking/parking-service';
import { useCallback, useEffect } from 'react';

export function FilterScheduleSheet({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const fetchOperations = useCallback(() => {
    return getOperationsById(parkingLotUuid, 2025, 6);
  }, [parkingLotUuid]);

  const { data: operations } = useFetchData<OperationsInfo[]>(fetchOperations);
  useEffect(() => {
    console.log(operations);
  }, [operations]);
  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-8 pb-28 max-w-[600px]"
    >
      <SheetTitle className="mt-10 text-xl">일정을 선택해주세요</SheetTitle>
      <SheetDescription />
      <SelectScheduleSection operations={operations || undefined} />
    </SheetContent>
  );
}
