import { cn } from '@repo/ui/lib/utils';
import { CalendarCheckIcon, CalendarIcon, XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';
import SelectedScheduleInfo from './SelectedScheduleInfo';

export function FilterScheduleBadge(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const params = useSearchParams();
  const router = useRouter();

  const entry = params.get('entry');
  const exit = params.get('exit');

  const filterSchedule = entry && exit;

  const handleReset = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete('entry');
    newParams.delete('exit');

    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return filterSchedule ? (
    <button
      type="button"
      {...props}
      className={cn(
        'rounded-full border-primary border-1 pl-4 pr-1 py-2 shadow-md flex items-center gap-2.5 bg-gray-light-1',
        props.className
      )}
    >
      <CalendarCheckIcon className="size-5 stroke-2 stroke-primary" />
      <SelectedScheduleInfo entryDate={entry!} exitDate={exit!} />

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleReset();
        }}
      >
        <XIcon className="size-4.5 stroke-2 mx-2 stroke-gray-2" />
      </div>
    </button>
  ) : (
    <button
      type="button"
      {...props}
      className={cn(
        'rounded-full px-4 py-2 shadow-md flex items-center gap-1.5 bg-gray-light-1 text-gray-2',
        props.className
      )}
    >
      <CalendarIcon className="size-4 stroke-2 stroke-gray-2" />
      <p className="font-medium text-sm leading-none">일정 선택</p>
    </button>
  );
}
