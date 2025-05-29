'use client';

import { GnbMenuType } from '@/types/GnbMenuType';
import { cn } from '@repo/ui/lib/utils';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function GnbMenu({ id, main = false, link, icon: Icon }: GnbMenuType) {
  const currentPage = usePathname();
  const isCurrent = currentPage === id;

  return main ? (
    <li className="px-6">
      <Link href={link}>
        <Icon
          className={cn(
            'absolute -top-8 left-1/2 -translate-x-1/2 p-4 size-[4.375rem] rounded-3xl bg-primary outline-7 outline-white '
          )}
        />
      </Link>
    </li>
  ) : (
    <li>
      <Link href={link}>
        <Icon
          className={cn(
            'relative stroke-primary-dark-50 cursor-pointer',
            isCurrent && 'ease-in stroke-navy-1 after:content size-[27px]'
          )}
        />
      </Link>
      {isCurrent && !main && (
        <Dot className="absolute bottom-2 stroke-primary-dark-50 ease-in-500" />
      )}
    </li>
  );
}
