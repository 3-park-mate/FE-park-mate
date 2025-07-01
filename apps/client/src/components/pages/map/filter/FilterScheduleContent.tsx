import { useEffect, useRef } from 'react';
import SelectTimes from '../../check-availability/SelectTimes';
import { useSchedulePicker } from '@/hooks/useSchedulePicker';
import { Calendar } from '@repo/ui/components/base/calendar';
import {
  HeadingWithDesc,
  PaddedLayout,
} from '@repo/ui/components/common/CommonLayouts';
import FilterScheduleButton from './FilterScheduleButton';

export default function FilterScheduleContent({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  const {
    dateRange,
    selectedDateTime,
    handleDateChange,
    handleTimeChange,
    reset,
  } = useSchedulePicker();

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dateRange]);

  return (
    <form>
      <PaddedLayout>
        <HeadingWithDesc
          heading="일정 선택"
          subHeading="방문 일정을 입력하고 예약 가능한 주차면 수를 확인하세요"
        />
        <section className="mb-30">
          <p className="text-xs text-right px-3 cursor-pointer" onClick={reset}>
            초기화
          </p>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateChange}
            className="w-full px-1"
          />
          {dateRange?.from && dateRange.to && (
            <SelectTimes
              from={dateRange.from}
              to={dateRange.to}
              onChange={handleTimeChange}
              className="mt-8"
            />
          )}
          <div ref={endRef} />
        </section>
        <FilterScheduleButton
          setOpen={setOpen}
          selectedDateTime={selectedDateTime}
        />
      </PaddedLayout>
    </form>
  );
}
