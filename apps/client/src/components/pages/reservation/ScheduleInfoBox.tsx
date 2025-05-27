'use client';

import React, { useState } from 'react';
import { Calendar } from '../../../../../../packages/ui/src/components/base/calendar';
import { DateRange } from 'react-day-picker';
import { FilterInfoType } from './ReservationInfoSection';

export default function ScheduleInfoBox({
  setFilterInfo,
}: {
  setFilterInfo: React.Dispatch<React.SetStateAction<FilterInfoType>>;
}) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [confirm, setConfirm] = useState(false);

  const handleSelectSchedule = (schedule: DateRange | undefined) => {
    setRange(schedule);

    setFilterInfo((prev) => ({
      ...prev,
      schedule: {
        entryTime: `${schedule?.from?.getFullYear().toString()} ${schedule?.from?.getDay().toString()} ${schedule?.from?.getDate().toString()}`,
        exitTime: `${schedule?.to?.getFullYear().toString()} ${schedule?.to?.getDay().toString()} ${schedule?.to?.getDate().toString()}`,
      },
    }));
  };

  const handleConfirm = () => {
    if (range?.from && range.to) {
      console.log('일정 선택 완료');
      setConfirm(true);
    }
  };
  4;
  return (
    <div className="flex flex-col items-center pt-3">
      {confirm ? (
        <>
          <p>
            {range?.from?.getFullYear().toString()}
            {range?.from?.getDay().toString()}
            {range?.from?.getDate().toString()}
          </p>
          <p>
            {range?.to?.getFullYear().toString()}
            {range?.to?.getDay().toString()} {range?.to?.getDate().toString()}
          </p>
        </>
      ) : (
        <>
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelectSchedule}
            className="rounded-md w-full bg-white"
          />
          <button onClick={handleConfirm}>확인</button>
        </>
      )}
    </div>
  );
}
