'use client';

import { cn } from '@repo/ui/lib/utils';

export default function ParkingLotSimpleInfoCardSkeleton({
  imageAlign = 'right',
  className,
}: {
  imageAlign?: 'right' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn('rounded-2xl bg-white shadow-xl  px-4 py-4 min-h-[120px]')}
    >
      <div className={cn('flex items-center gap-5 animate-pulse', className)}>
        {imageAlign === 'left' && (
          <div className="w-[90px] h-[90px] bg-gray-200 rounded-lg" />
        )}
        <div className="flex flex-col flex-1 gap-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded mt-2" />
        </div>
        {imageAlign === 'right' && (
          <div className="w-[90px] h-[90px] bg-gray-200 rounded-lg" />
        )}
      </div>
    </div>
  );
}
