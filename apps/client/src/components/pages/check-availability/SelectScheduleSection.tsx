'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import SelectDays from './SelectDays';
import { getOperationsById } from '@/actions/parking/parking-service';
import { OperationsInfo } from '@/types/parkingDataTypes';
import { useSchedulePicker } from '@/hooks/useSchedulePicker';
import SelectTimes from './SelectTimes';
import CheckAvailableSpotsSheet from './CheckAvailableSpotsSheet';

export default function SelectScheduleSection({
  parkingLotUuid,
}: {
  parkingLotUuid?: string;
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

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
    if (dateRange?.from && dateRange?.to) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dateRange]);

  return (
    <section className="flex flex-col gap-3 justify-center pb-28">
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
      <CheckAvailableSpotsSheet
        parkingLotUuid={parkingLotUuid || ''}
        schedule={selectedSchedule}
      />
    </section>
  );
}
