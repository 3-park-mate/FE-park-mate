'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { eachDayOfInterval, format } from 'date-fns';
import { combineDateAndTime } from '@/utils/datetimeUtils';

export function useSchedulePicker(availableDays: string[]) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedDateTime, setSelectedDateTime] = useState({
    entryDateTime: null,
    exitDateTime: null,
  });

  const reset = () => {
    setDateRange(undefined);
    setSelectedDateTime({ entryDateTime: null, exitDateTime: null });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      reset();
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
      reset();
    }
  };

  const handleTimeChange = (type: 'entry' | 'exit', value: string) => {
    if (!dateRange?.from || !dateRange?.to) return;
    const baseDate = type === 'entry' ? dateRange.from : dateRange.to;
    const dateTime = combineDateAndTime(baseDate, value);

    setSelectedDateTime((prev) => ({
      ...prev,
      [type === 'entry' ? 'entryDateTime' : 'exitDateTime']: dateTime,
    }));
  };

  return {
    dateRange,
    selectedDateTime,
    handleDateChange,
    handleTimeChange,
    reset,
  };
}
