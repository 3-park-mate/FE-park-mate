'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import SelectDays from './SelectDays';
import { getOperationsById } from '@/actions/parking/parking-service';
import { OperationsInfo } from '@/types/parkingDataTypes';
import { useSchedulePicker } from '@/hooks/useSchedulePicker';
import SelectTimes from './SelectTimes';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { useFormContext } from 'react-hook-form';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import AmountInfo from './AmountInfo';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';

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

  const { setValue } = useFormContext();

  const [operations, setOperations] = useState<OperationsInfo[] | null>(null);
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

  const handleMonthChange = (date: Date) => {
    setCurrentMonth({ year: date.getFullYear(), month: date.getMonth() + 1 });
  };

  useEffect(() => {
    setValue('schedule', selectedSchedule);
  }, [selectedSchedule, setValue]);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dateRange]);

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
      {dateRange?.from && dateRange.to && (
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
          // disabled={!isActive || loading}
          className={cn('h-12 text-md')}
        >
          예약 가능 주차면 확인
        </Button>
      </ButtonWrapper>
    </section>
  );
}
