'use client';
import React, { useState } from 'react';
import { ReservationInfoBox } from './ReservationInfoBox';
import { Calendar } from '@repo/ui/components/base/calendar';
import { DateRange } from 'react-day-picker';

export default function ScheduleInfoBox({ select }: { select: string }) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  return select !== 'selectSchedule' ? (
    <>
      <ReservationInfoBox boxName="날짜" buttonName="날짜 추가" />
    </>
  ) : (
    <div className="rounded-sm p-6 bg-white/60 shadow-md">
      <h2 className="text-2xl font-semibold">날짜</h2>
      <div className="flex flex-col items-center">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          className="rounded-md bg-white"
        />
      </div>
    </div>
  );
}
