import { cn } from '@repo/ui/lib/utils';
import { FilterIcon } from 'lucide-react';

export default function FilterButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        'absolute top-22 right-5 p-2 rounded-full bg-gray-100/90 shadow-md z-50 cursor-pointer hover:bg-white',
        className
      )}
    >
      <FilterIcon className="size-7 fill-gray-2 stroke-gray-2" />
    </button>
  );
}
