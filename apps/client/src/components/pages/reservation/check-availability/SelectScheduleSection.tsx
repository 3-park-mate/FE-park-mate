'use client';

import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import TimeInputs from './TimeInputs';
import { eachDayOfInterval, format } from 'date-fns';
import CheckSpotsButton from './CheckSpotsButton';
import { combineDateAndTime } from '@/utils/datetimeUtils';
import SelectDays from './SelectDays';
import { OperationsInfo } from '@/types/parkingDataTypes';

export default function SelectScheduleSection({
  operations,
}: {
  operations?: OperationsInfo[];
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedDateTime, setSelectedDateTime] = useState<{
    entryDateTime: Date | null;
    exitDateTime: Date | null;
  }>({ entryDateTime: null, exitDateTime: null });

  const availableDays = useMemo(() => {
    if (!operations) return [];
    return operations.map((op) => op.operationDate);
  }, [operations]);

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      setDateRange(range);
      setSelectedDateTime({ entryDateTime: null, exitDateTime: null });
      return;
    }

    const days = eachDayOfInterval({ start: range.from, end: range.to });
    const allAvailable = days.every((date) =>
      availableDays.includes(format(date, 'yyyy-MM-dd'))
    );

    if (allAvailable) {
      setDateRange(range);
      setSelectedDateTime({ entryDateTime: null, exitDateTime: null });
    } else {
      setDateRange(undefined);
      setSelectedDateTime({ entryDateTime: null, exitDateTime: null });
    }
  };

  const handleTimeChange = (type: 'entry' | 'exit', value: string) => {
    if (!dateRange?.from || !dateRange?.to) return;

    const date = type === 'entry' ? dateRange.from : dateRange.to;
    const dateTime = combineDateAndTime(date, value);

    setSelectedDateTime((prev) => ({
      ...prev,
      [type === 'entry' ? 'entryDateTime' : 'exitDateTime']: dateTime,
    }));
  };

  return (
    <section className="flex flex-col gap-3 justify-center">
      <p
        className="text-xs text-right px-3 leading-0"
        onClick={() => {
          setDateRange(undefined);
          setSelectedDateTime({ entryDateTime: null, exitDateTime: null });
        }}
      >
        초기화
      </p>

      <SelectDays
        availableDays={availableDays}
        selected={dateRange}
        onSelect={handleDateChange}
      />

      {dateRange?.from && dateRange.to && (
        <TimeInputs
          from={dateRange.from}
          to={dateRange.to}
          onChange={handleTimeChange}
        />
      )}

      <CheckSpotsButton selectedDateTime={selectedDateTime} />
    </section>
  );
}
