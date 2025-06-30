'use client';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { eachDayOfInterval, format } from 'date-fns';
import { combineDateAndTime } from '@/utils/datetimeUtils';

export function useSchedulePicker(availableDays: string[]) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [timeRange, setTimeRange] = useState({ entryTime: '', exitTime: '' });

  const reset = () => {
    setDateRange(undefined);
    setTimeRange({ entryTime: '', exitTime: '' });
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
    } else {
      reset();
    }
  };

  const handleTimeChange = (type: 'entry' | 'exit', value: string) => {
    setTimeRange((prev) => ({
      ...prev,
      [type === 'entry' ? 'entryTime' : 'exitTime']: value,
    }));
  };

  return {
    dateRange,
    timeRange,
    handleDateChange,
    handleTimeChange,
    reset,
  };
}
