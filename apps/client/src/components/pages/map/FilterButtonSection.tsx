'use client';

import { EvChargeButton } from './FilterEvChargeButton';
import SelectScheduleSheet from './SelectScheduleSheet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RotateCcw } from 'lucide-react';

export default function FilterButtonSection() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasActiveFilters =
    searchParams.get('ev') === 'true' ||
    searchParams.get('start') ||
    searchParams.get('end');

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('ev');
    params.delete('start');
    params.delete('end');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="fixed px-5 top-17 z-50 flex gap-5 w-full max-w-[500px]">
      <SelectScheduleSheet />
      <EvChargeButton />
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="rounded-full px-3 py-2 shadow-md flex items-center gap-1.5 bg-gray-light-1 text-gray-2 hover:bg-gray-200"
        >
          <RotateCcw className="size-4" />
          <p className="font-medium text-sm leading-none">초기화</p>
        </button>
      )}
    </section>
  );
}
