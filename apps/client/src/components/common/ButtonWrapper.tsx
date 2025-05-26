import { cn } from '@repo/ui/lib/utils';
import React, { ReactNode } from 'react';

export default function ButtonWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] px-5 pb-6 pt-8',
        'bg-white/80 rounded-sm shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
