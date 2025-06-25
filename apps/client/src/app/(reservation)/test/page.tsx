'use client';
import { useState } from 'react';
import { Calendar } from '@repo/ui/components/base/calendar';
import { DateRange } from 'react-day-picker';
import { eachDayOfInterval, format } from 'date-fns';
import { getAvailableDayDummy } from '@/data/reservationDummyDatas';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { formatDateParts } from '@/utils/datetimeUtils';

export default function Page() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const availableSet = new Set(getAvailableDayDummy.day);

  const isAvailable = (date: Date) =>
    availableSet.has(format(date, 'yyyy-MM-dd'));

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      setSelectedRange(range);
      return;
    }

    // 선택된 날짜 범위 내부의 모든 날짜 구하기
    const days = eachDayOfInterval({ start: range.from, end: range.to });

    // 모든 날짜가 availableSet에 포함되어야 함
    const allAvailable = days.every(isAvailable);

    if (allAvailable) {
      setSelectedRange(range);
    } else {
      //   alert('선택한 날짜 범위에 예약 불가 날짜가 포함되어 있습니다.');
      setSelectedRange(undefined); // 선택 취소
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 justify-center px-8">
        <p className="text-right" onClick={() => setSelectedRange(undefined)}>
          일정 초기화
        </p>
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          disabled={(date) => !isAvailable(date)}
          className="w-full"
        />
        {selectedRange && (
          <div className="flex gap-5 ">
            <CommonInputWithLabel
              label={`입차시간 ${selectedRange.from ? formatDateParts(selectedRange.from.toString()).date : ''}`}
              type="time"
              placeholder="예: 22:00"
            />
            <CommonInputWithLabel
              label={`출차시간 ${selectedRange.to ? formatDateParts(selectedRange.to.toString()).date : ''}`}
              type="time"
              placeholder="예: 22:00"
            />
          </div>
        )}
      </div>
    </>
  );
}
