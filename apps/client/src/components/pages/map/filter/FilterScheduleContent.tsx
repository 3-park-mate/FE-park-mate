import { useEffect, useRef } from 'react';
import SelectTimes from '../../reservation-pre/check-availability/SelectTimes';
import { useSchedulePicker } from '@/hooks/useSchedulePicker';
import { Calendar } from '@repo/ui/components/base/calendar';
import {
  HeadingWithDesc,
  PaddedLayout,
} from '@repo/ui/components/common/CommonLayouts';
import FilterScheduleButton from './FilterScheduleButton';
import { useFormContext } from 'react-hook-form';

export default function FilterScheduleContent() {
  const { setValue } = useFormContext();

  const endRef = useRef<HTMLDivElement | null>(null);

  const {
    dateRange,
    selectedSchedule,
    handleDateChange,
    handleTimeChange,
    reset,
  } = useSchedulePicker();

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }, [dateRange]);

  useEffect(() => {
    setValue('entryDateTime', selectedSchedule.entryDateTime, {
      shouldValidate: true,
    });
    setValue('exitDateTime', selectedSchedule.exitDateTime, {
      shouldValidate: true,
    });
  }, [selectedSchedule, setValue]);

  return (
    <PaddedLayout>
      <div className="top-0 z-50">
        <HeadingWithDesc
          heading="일정 선택"
          subHeading="방문 일정을 입력하고 예약 가능한 주차면 수를 확인하세요"
        />
      </div>
      <section className="mb-25">
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
            className="mt-5"
          />
        )}
        <div ref={endRef} />
      </section>
      <FilterScheduleButton />
    </PaddedLayout>
  );
}
