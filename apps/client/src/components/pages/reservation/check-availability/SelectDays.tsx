'use client';

import { Calendar } from '@repo/ui/components/base/calendar';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface Props {
  availableDays: string[];
  onSelect: (range: DateRange | undefined) => void;
  selected: DateRange | undefined;
  onMonthChange?: (date: Date) => void;
}

export default function SelectDays({
  availableDays,
  selected,
  onSelect,
  onMonthChange,
}: Props) {
  const availableSet = new Set(availableDays);
  const isAvailable = (date: Date) =>
    availableSet.has(format(date, 'yyyy-MM-dd'));

  return (
    <Calendar
      mode="range"
      selected={selected}
      onSelect={onSelect}
      onMonthChange={onMonthChange}
      disabled={(date) => !isAvailable(date)}
      className="w-full px-1 pt-0 pb-4"
    />
  );
}
