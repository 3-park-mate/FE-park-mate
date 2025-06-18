import { cn } from '@repo/ui/lib/utils';
import { FilterIcon } from 'lucide-react';

export default function FilterButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        'absolute top-22 right-5 z-50 p-2 bg-gray-100/90 rounded-full shadow-md',
        className
      )}
    >
      <FilterIcon className="size-7 fill-gray-2 stroke-gray-2" />
    </button>
  );
}
