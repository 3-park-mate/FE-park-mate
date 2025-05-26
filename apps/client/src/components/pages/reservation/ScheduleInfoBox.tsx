'use client';
import React, { useState } from 'react';
import { Calendar } from '@repo/ui/components/base/calendar';
import { DateRange } from 'react-day-picker';

export default function ScheduleInfoBox() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  return (
    <div className="flex flex-col items-center">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-md w-full bg-white"
      />
    </div>
  );
}
