'use client';
import { Calendar } from '@repo/ui/components/base/calendar';
import { operationsDummy } from '@/data/parkingDummyDatas';
import { useState } from 'react';
import { OperationDataType } from '@/types/parkingDataTypes';
import OperationInfo from './OperationInfo';

export default function OperationCalendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedOperation, setSelectedOperation] =
    useState<OperationDataType | null>(() => {
      return (
        operationsDummy.find(
          (op) =>
            new Date(op.operationDate).toDateString() === today.toDateString()
        ) ?? null
      );
    });

  const operationDates = operationsDummy.map(
    (op) => new Date(op.operationDate)
  );

  const handleSelect = (day?: Date) => {
    if (!day) return;
    setSelectedDate(day);
    const matched = operationsDummy.find(
      (op) => new Date(op.operationDate).toDateString() === day.toDateString()
    );
    setSelectedOperation(matched ?? null);
  };

  return (
    <div className="py-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        captionLayout="dropdown"
        modifiers={{
          hasData: operationDates,
        }}
        modifiersClassNames={{
          hasData: 'text-secondary',
        }}
        className="w-full max-w-[400px] mx-auto"
      />
      <OperationInfo
        operation={selectedOperation}
        selectedDate={selectedDate}
      />
    </div>
  );
}
