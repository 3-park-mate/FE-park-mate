'use client';

import React, { useState } from 'react';
import { Calendar } from '../../../../../../packages/ui/src/components/base/calendar';
import { DateRange } from 'react-day-picker';
import { useParkingFilterStore } from '@/store/useParkingFilterStore';

export default function ScheduleInfoBox() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [confirm, setConfirm] = useState(false);
  const [edit, setEdit] = useState(false);

  const schedule = useParkingFilterStore((state) => state.schedule);
  const setSchedule = useParkingFilterStore((state) => state.setSchedule);

  const handleConfirm = () => {
    if (range?.from && range.to) {
      console.log('일정 선택 완료');
      setConfirm(true);
      setEdit(false);
      setSchedule(range.from.toString(), range.to.toString());
    }
  };

  return (
    <div className="flex flex-col items-center pt-3">
      {confirm && !edit ? (
        <div onClick={() => setEdit(true)}>
          <p> 일정 선택 테스트</p>
          <p>{schedule?.entryTime}</p> <p>{schedule?.exitTime}</p>
        </div>
      ) : (
        <>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            className="rounded-md w-full bg-white"
          />
          <button onClick={handleConfirm}>확인</button>
        </>
      )}
    </div>
  );
}
