'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getOperationsById } from '@/actions/parking/parking-service';
import { useSchedulePicker } from '@/hooks/useSchedulePicker';
import { OperationsInfo } from '@/types/parkingDataTypes';
import SelectDays from './SelectDays';
import SelectTimes from './SelectTimes';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { toLocalISOString } from '@/utils/datetimeUtils';
import ClockLoaderWithText from '../../../../../../../packages/ui/src/components/common/ClockLoaderWithText';
import CheckAvailableSpotsButton from './CheckAvailableSpotsButton';

export default function SelectScheduleSection({
  parkingLotUuid,
  onClickReserve,
}: {
  parkingLotUuid?: string;
  onClickReserve: () => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const [operations, setOperations] = useState<OperationsInfo[] | null>(null);
  const { setValue } = useFormContext<CreateReservationRequestType>();
  const endRef = useRef<HTMLDivElement | null>(null);

  const availableDays = useMemo(() => {
    return operations?.map((op) => op.operationDate) ?? [];
  }, [operations]);

  const {
    dateRange,
    selectedSchedule,
    handleDateChange,
    handleTimeChange,
    reset,
  } = useSchedulePicker(availableDays);

  useEffect(() => {
    if (!parkingLotUuid) return;

    getOperationsById(
      parkingLotUuid,
      currentMonth.year,
      currentMonth.month
    ).then((res) => {
      setOperations(res.success ? res.data : []);
    });
  }, [parkingLotUuid, currentMonth]);

  useEffect(() => {
    if (selectedSchedule.entryDateTime && selectedSchedule.exitDateTime) {
      setValue('entryTime', toLocalISOString(selectedSchedule.entryDateTime));
      setValue('exitTime', toLocalISOString(selectedSchedule.exitDateTime));
    }
  }, [selectedSchedule, setValue]);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dateRange]);

  const handleMonthChange = (date: Date) => {
    setCurrentMonth({ year: date.getFullYear(), month: date.getMonth() + 1 });
  };

  return (
    <section className="flex flex-col gap-3 justify-center pb-28">
      <HeadingWithDesc
        heading="일정 선택"
        subHeading="입출차 시간을 선택하고 타입별 잔여 수를 확인하세요."
        className="pt-10"
      />
      <p
        className="text-xs text-right px-3 cursor-pointer"
        onClick={() => {
          {
            reset();
            setValue('entryTime', '');
            setValue('exitTime', '');
          }
        }}
      >
        초기화
      </p>
      {operations ? (
        <>
          <SelectDays
            availableDays={availableDays}
            selected={dateRange}
            onSelect={handleDateChange}
            onMonthChange={handleMonthChange}
          />
          {dateRange?.from && dateRange?.to && (
            <SelectTimes
              from={dateRange.from}
              to={dateRange.to}
              onChange={handleTimeChange}
            />
          )}
          <div ref={endRef} />
          <CheckAvailableSpotsButton
            onClick={onClickReserve}
            label="잔여 주차면 확인"
          />
        </>
      ) : (
        <ClockLoaderWithText text="운영 정보를 불러오는 중입니다.." />
      )}
    </section>
  );
}
