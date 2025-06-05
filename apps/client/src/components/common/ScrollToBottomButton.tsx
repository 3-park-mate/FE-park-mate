'use client';
import { ArrowDownIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { scrollToBottomUtil } from '@/utils/scrollUtils';
import { RefObject } from 'react';

export function ScrollToBottomButton({
  show,
  targetRef,
  className,
}: {
  show: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'fixed bottom-4 flex justify-end pr-10 w-full max-w-[600px]',
        className
      )}
    >
      <button
        onClick={() => scrollToBottomUtil(targetRef)}
        className={cn(
          'bg-black/80 text-white rounded-full p-2 opacity-0 transition-all duration-200',
          show && 'opacity-100'
        )}
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
}
