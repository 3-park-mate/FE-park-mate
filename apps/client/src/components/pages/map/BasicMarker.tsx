import { cn } from '@repo/ui/lib/utils';
import { MapPin } from 'lucide-react';
import React from 'react';

export default function BasicMarker({
  availableSpots,
  className,
}: {
  availableSpots?: number;
  className?: string;
}) {
  return (
    <>
      <MapPin className={cn('absolute top-0 size-14 fill-gray-3 stroke-0')} />

      <p
        className={cn(
          'absolute top-2.5 left-3.5  h-7 w-7 inline-flex items-center justify-center rounded-full font-semibold text-sm bg-white shadow-lg',
          className
        )}
      >
        {availableSpots || 0}
      </p>
    </>
  );
}
