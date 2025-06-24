'use client';

import { cn } from '@repo/ui/lib/utils';
import { CalendarIcon, ZapIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function FilterSection() {
  return (
    <section className="fixed px-5 top-17 z-50 flex gap-5 w-full max-w-[500px]">
      <ScheduleButton />
      <EvChargeButton />
    </section>
  );
}

// export function EvChargeButton() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const ev = searchParams.get('ev') === 'true';

//   const updateQuery = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set(key, value);

//     // 새로고침 포함하여 이동
//     window.location.href = `${pathname}?${params.toString()}`;
//   };

//   return (
//     <button
//       onClick={() => updateQuery('ev', String(!ev))}
//       className={cn(
//         'rounded-full px-2 shadow-md flex items-center gap-1',
//         ev ? 'bg-primary text-white fill-white' : 'bg-gray-light-1 text-gray-2'
//       )}
//     >
//       <ZapIcon
//         className={cn(
//           'size-4',
//           ev ? ' fill-white' : 'fill-gray-2 stroke-gray-2'
//         )}
//       />
//       <p className="font-medium text-sm leading-none">전기차</p>
//     </button>
//   );
// }
export function EvChargeButton() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentEv = searchParams.get('ev') === 'true';

  const toggleEv = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('ev', String(!currentEv));

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <button
      onClick={toggleEv}
      className={cn(
        'rounded-full px-2 shadow-md flex items-center gap-1',
        currentEv
          ? 'bg-primary text-white fill-white'
          : 'bg-gray-light-1 text-gray-2'
      )}
    >
      <ZapIcon
        className={cn(
          'size-4',
          currentEv ? ' fill-white' : 'fill-gray-2 stroke-gray-2'
        )}
      />
      <p className="font-medium text-sm leading-none">전기차</p>
    </button>
  );
}

export function ScheduleButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    // 새로고침 포함하여 이동
    window.location.href = `${pathname}?${params.toString()}`;
  };

  return (
    <button
      className={cn(
        'rounded-full px-4 py-2 shadow-md flex items-center gap-1.5',
        date
          ? 'bg-primary-light text-white fill-white'
          : 'bg-gray-light-1 text-gray-2'
      )}
    >
      <CalendarIcon
        className={cn(
          'size-4 stroke-3',
          date ? ' stroke-white' : 'stroke-gray-2'
        )}
      />
      <p className="font-medium text-sm leading-none">일정 선택</p>
    </button>
  );
}
