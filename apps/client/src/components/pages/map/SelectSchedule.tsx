'use client';

import ButtonWrapper from '@/components/common/ButtonWrapper';
import { formatDateParts } from '@/utils/datetimeUtils';
import { Button } from '@repo/ui/components/base/button';
import { Calendar } from '@repo/ui/components/base/calendar';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { cn } from '@repo/ui/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export function SelectSchedule({ onClose }: { onClose: () => void }) {
  const [selectedDay, setSelectedDay] = useState<DateRange | undefined>();
  const [selectedTime, setselectedTime] = useState({
    entryTime: '',
    exitTime: '',
  });

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('schedule', selectedTime.entryTime);
    router.push(`${pathname}?${params.toString()}`);

    setSelectedDay(undefined);
    setselectedTime({ entryTime: '', exitTime: '' });

    onClose();
  };

  return (
    <section className="w-full px-6 pb-25 max-w-[600px]">
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
          onSelect={(range) => setSelectedDay(range)}
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
          onClick={handleClick}
        >
          선택 완료
        </Button>
      </ButtonWrapper>
    </section>
  );
}
