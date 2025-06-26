'use client';

import { useState } from 'react';
import { Calendar } from '@repo/ui/components/base/calendar';
import { DateRange } from 'react-day-picker';
import { eachDayOfInterval, format } from 'date-fns';
import { getAvailableDayDummy } from '@/data/reservationDummyDatas';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { formatDateParts } from '@/utils/datetimeUtils';
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { Button } from '@repo/ui/components/base/button';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import { cn } from '@repo/ui/lib/utils';

export function FilterScheduleSheet() {
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
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-6 pb-25 max-w-[600px]"
    >
      <SheetTitle />
      <SheetDescription />
      <section>
        <div className="flex justify-between items-baseline pt-10 px-3">
          <HeadingWithDesc heading="일정을 선택해주세요" className="pt-0" />
          <p className="text-xs" onClick={() => setSelectedDay(undefined)}>
            초기화
          </p>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <Calendar
            mode="range"
            selected={selectedDay}
            onSelect={handleSelect}
            disabled={(date) => !isAvailable(date)}
            className="w-full"
          />
          {selectedDay && (
            <div className="flex gap-5 ">
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
        </div>
        <ButtonWrapper>
          <Button
            className={cn(
              'w-full',
              selectedDay && selectedTime.entryTime && selectedTime.exitTime
                ? 'bg-primary'
                : 'bg-gray-1'
            )}
            disabled={
              !(selectedDay && selectedTime.entryTime && selectedTime.exitTime)
            }
          >
            선택 완료
          </Button>
        </ButtonWrapper>
      </section>
    </SheetContent>
  );
}
