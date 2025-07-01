'use client';

import { cn } from '@repo/ui/lib/utils';
import { ZapIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function FilterEvChargeBadge() {
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
