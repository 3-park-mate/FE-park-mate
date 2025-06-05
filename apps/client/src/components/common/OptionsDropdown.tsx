'use client';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import { cn } from '@repo/ui/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export interface DropdownOption {
  label: string;
  value: string;
}

export default function OptionsDropdown({
  options,
  paramKey,
  defaultLabel = '정렬',
  className,
}: {
  options: DropdownOption[];
  paramKey: string;
  defaultLabel?: string;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramKey);
  const selectedLabel =
    options.find((opt) => opt.value === currentValue)?.label || defaultLabel;

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, value);
    router.push(`?${params.toString()}`);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(`relative w-full flex justify-end`, className)}>
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer text-sm text-gray-700 select-none">
            <span>{selectedLabel}</span>
            <ChevronDownIcon
              className={cn(
                'w-4 h-4 transition-transform duration-300 ease-in-out',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
