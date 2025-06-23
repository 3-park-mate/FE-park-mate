'use client';
import { Calendar } from '@repo/ui/components/base/calendar';
import { operationsDummy } from '@/data/parkingDummyDatas';
import { useState } from 'react';
import { OperationDataType } from '@/types/parkingDataTypes';

export default function OperationCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedOperation, setSelectedOperation] =
    useState<OperationDataType | null>(null);

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
    <div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        modifiers={{
          hasData: operationDates,
        }}
        modifiersClassNames={{
          hasData: 'text-secondary font-semibold',
        }}
      />
      <div className="mt-4 p-4 border rounded-md bg-gray-50">
        {selectedOperation ? (
          <div className="flex flex-col gap-2">
            <div>
              <strong>Base Fee:</strong> {selectedOperation.baseFee}원
            </div>
            <div>
              <strong>운영 시간:</strong>{' '}
              {new Date(selectedOperation.validStartTime).toLocaleTimeString(
                [],
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )}{' '}
              ~{' '}
              {new Date(selectedOperation.validEndTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div>
              <strong>할인율:</strong> {selectedOperation.discountRate}%
            </div>
          </div>
        ) : selectedDate ? (
          <div>이 날짜는 등록된 운영 정보가 없습니다.</div>
        ) : (
          <div>날짜를 선택해주세요.</div>
        )}
      </div>
    </div>
  );
}
