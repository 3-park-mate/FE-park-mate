import { CalendarIcon } from 'lucide-react';

export function ScheduleButton() {
  return (
    <button
      type="button"
      className="rounded-full px-4 py-2 shadow-md flex items-center gap-1.5 bg-gray-light-1 text-gray-2"
    >
      <CalendarIcon className="size-4 stroke-3 stroke-gray-2" />
      <p className="font-medium text-sm leading-none">일정 선택</p>
    </button>
  );
}
