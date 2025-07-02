'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getOperationsById } from '@/actions/parking/parking-service';
import { useSchedulePicker } from '@/hooks/useSchedulePicker';
import { OperationsInfo } from '@/types/parkingDataTypes';
import SelectDays from './SelectDays';
import SelectTimes from './SelectTimes';
import AmountInfo from './AmountInfo';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Button } from '@repo/ui/components/base/button';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { cn } from '@repo/ui/lib/utils';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';

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
  const {
    setValue,
    formState: { errors },
  } = useFormContext<CreateReservationRequestType>();
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
    setValue('schedule', selectedSchedule);
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
        className="pt-3"
      />
      <p className="text-xs text-right px-3 cursor-pointer" onClick={reset}>
        초기화
      </p>
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
      <ButtonWrapper className="flex items-center justify-between border-t-1 pt-4 bg-white">
        <AmountInfo />
        <Button
          onClick={onClickReserve}
          className={cn('h-12 text-md')}
          disabled={!!errors.schedule}
        >
          예약 가능 주차면 확인
        </Button>
      </ButtonWrapper>
    </section>
  );
}
