import { formatDate } from '@/utils/datetimeUtils';
import { cn } from '@repo/ui/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export function FilterScheduleBadge(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const params = useSearchParams();

  const entry = params.get('entry');
  const exit = params.get('exit');

  const filterSchedule = entry && exit;

  return (
    <button
      type="button"
      {...props}
      className={cn(
        'rounded-full px-4 py-2 shadow-md flex items-center gap-1.5 bg-gray-light-1 text-gray-2',
        filterSchedule && 'bg-primary px-5'
      )}
    >
      <CalendarIcon
        className={cn(
          'size-4 stroke-3 stroke-gray-2',
          filterSchedule && 'stroke-white'
        )}
      />
      {filterSchedule ? (
        <p className="text-xs text-white font-semibold px-1">
          입차: {formatDate(entry)}
          <br />
          출차: {formatDate(exit)}
        </p>
      ) : (
        <p className="font-medium text-sm leading-none">일정 선택</p>
      )}
    </button>
  );
}
