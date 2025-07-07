import { formatDateParts } from '@/utils/datetimeUtils';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { isSameDay, isToday } from 'date-fns';
import { useEffect, useState } from 'react';

export default function SelectedScheduleInfo({
  entryDate,
  exitDate,
}: {
  entryDate: string;
  exitDate: string;
}) {
  //  mode => 1: ONE_DAY_TODAY, 2: ONE_DAY_OTHER, 3: MULTI_DAYS
  const [mode, setMode] = useState<'1' | '2' | '3'>();

  useEffect(() => {
    const sameDay = isSameDay(entryDate, exitDate);
    const entryToday = isToday(entryDate);
    if (sameDay && entryToday) {
      setMode('1');
    } else if (sameDay) {
      setMode('2');
    } else {
      setMode('3');
    }
  }, [entryDate, exitDate]);

  if (!mode) return <DotSpinner className="py-1 " />;

  return (
    <div className="text-xs flex flex-col">
      {mode === '2' && (
        <>
          <p>{formatDateParts(entryDate!).date}</p>
          <hr className="my-0.5 border-t border-gray-2" />
        </>
      )}
      {mode === '3' && (
        <>
          <p>
            {formatDateParts(entryDate!).date} -{' '}
            {formatDateParts(exitDate!).date}
          </p>
          <hr className="my-0.5 border-t border-gray-1" />
        </>
      )}
      <p className="text-sm">
        {formatDateParts(entryDate!).time} - {formatDateParts(exitDate!).time}
      </p>
    </div>
  );
}
