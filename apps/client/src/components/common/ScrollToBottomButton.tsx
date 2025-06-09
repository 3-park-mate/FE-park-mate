'use client';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { scrollToBottomUtil } from '@/utils/scrollUtils';
import { RefObject } from 'react';

export function ScrollToBottomButton({
  show,
  targetRef,
  className,
  marginBottom = 36,
}: {
  show: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  className?: string;
  marginBottom?: number;
}) {
  return (
    <div
      style={{ bottom: `${marginBottom - 36 + 80}px` }}
      className={cn(
        `fixed flex justify-end pr-5 w-full max-w-[600px]`,
        className
      )}
    >
      <button
        onClick={() => scrollToBottomUtil(targetRef)}
        className={cn(
          'bg-gray-2 text-white rounded-full p-1.5 transition-all duration-700 shadow-lg opacity-0 cursor-pointer',
          show && 'opacity-100'
        )}
      >
        <ChevronDownIcon className="size-6" />
      </button>
    </div>
  );
}
