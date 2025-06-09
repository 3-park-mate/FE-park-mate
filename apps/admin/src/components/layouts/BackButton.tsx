'use client';

import { cn } from '@repo/ui/lib/utils';
import { ChevronLeft } from 'lucide-react';

export default function BackButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={cn('cursor-pointer', className)}>
      <ChevronLeft />
    </button>
  );
}
