import MarkerWithCar from '@repo/ui/components/icon/MarkerWithCar';
import { cn } from '@repo/ui/lib/utils';
import React, { useEffect, useState } from 'react';

export default function SelectedMarker({ className }: { className?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        'absolute -top-3 transition-all duration-200',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        className
      )}
    >
      <MarkerWithCar size={60} />
    </div>
  );
}
