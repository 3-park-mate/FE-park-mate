import { cn } from '../../lib/utils';
import ClockSpinner from '../icon/ClockSpinner';

export default function ClockLoaderWithText({
  className,
  iconClassName,
  text,
}: {
  className?: string;
  iconClassName?: string;
  text?: string;
}) {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center gap-4 min-h-screen mt-10',
        className
      )}
    >
      <ClockSpinner className={cn('size-10 text-gray-3', iconClassName)} />
      {text && <p className="text-gray-2">{text}</p>}
    </div>
  );
}
