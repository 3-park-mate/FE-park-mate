import { cn } from '@repo/ui/lib/utils';
import { BellIcon } from 'lucide-react';
import Link from 'next/link';

export default function AlertBell({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <Link href="/notifications" className="relative">
      <BellIcon className="size-[24px]" />
      {count > 0 && (
        <span className="absolute -top-2 -right-1 w-[18px] h-[18px]">
          {/* <span className="absolute w-full h-full rounded-full bg-red-2 animate-ping opacity-40"></span> */}
          <span
            className={cn(
              'w-full h-full rounded-full bg-red-2 text-white text-[0.625rem] text-center font-semibold flex items-center justify-center',
              className
            )}
          >
            {count}
          </span>
        </span>
      )}
    </Link>
  );
}
