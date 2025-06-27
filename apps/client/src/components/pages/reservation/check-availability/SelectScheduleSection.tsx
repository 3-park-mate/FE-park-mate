'use client';

import { getAvailableDayDummy } from '@/data/reservationDummyDatas';
import { formatDateParts } from '@/utils/datetimeUtils';
import { Calendar } from '@repo/ui/components/base/calendar';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { eachDayOfInterval, format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import CheckSpotsButton from './CheckSpotsButton';

export default function SelectScheduleSection({
  availableDay,
}: {
  availableDay?: string[];
}) {
  const [selectedDay, setSelectedDay] = useState<DateRange | undefined>();
  const [selectedTime, setselectedTime] = useState({
    entryTime: '',
    exitTime: '',
  });
  const availableSet = new Set(getAvailableDayDummy.day);

  const isAvailable = (date: Date) =>
    availableSet.has(format(date, 'yyyy-MM-dd'));

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      setSelectedDay(range);
      return;
    }

    // 선택된 날짜 범위 내부의 모든 날짜 구하기
    const days = eachDayOfInterval({ start: range.from, end: range.to });
    console.log(days, ' 선택된 범위 내부');

    // 모든 날짜가 availableSet에 포함되어야 함
    const allAvailable = days.every(isAvailable);

    if (allAvailable) {
      setSelectedDay(range);
    } else {
      //   alert('선택한 날짜 범위에 예약 불가 날짜가 포함되어 있습니다.');
      setSelectedDay(undefined); // 선택 취소
    }
  };
  return (
    <section className="flex flex-col gap-3 justify-center">
      <p
        className="text-xs text-right px-3 leading-0"
        onClick={() => setSelectedDay(undefined)}
      >
        초기화
      </p>
      <Calendar
        mode="range"
        selected={selectedDay}
        onSelect={handleSelect}
        disabled={(date) => !isAvailable(date)}
        className="w-full px-1 pt-0 pb-4"
      />

      {selectedDay && (
        <div className="flex gap-5">
          <CommonInputWithLabel
            id="entryTime"
            label={`입차시간 ${selectedDay.from ? formatDateParts(selectedDay.from.toString()).date : ''}`}
            type="time"
            value={selectedTime.entryTime}
            onChange={(e) =>
              setselectedTime((prev) => ({
                ...prev,
                entryTime: e.target.value,
              }))
            }
          />
          <CommonInputWithLabel
            id="exitTime"
            label={`출차시간 ${selectedDay.to ? formatDateParts(selectedDay.to.toString()).date : ''}`}
            type="time"
            value={selectedTime.exitTime}
            onChange={(e) =>
              setselectedTime((prev) => ({
                ...prev,
                exitTime: e.target.value,
              }))
            }
          />
        </div>
      )}
      <CheckSpotsButton
        selectedDay={{ from: selectedDay?.from, to: selectedDay?.to }}
        selectedTime={selectedTime}
      />
    </section>
  );
}
