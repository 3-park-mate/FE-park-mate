'use client';

import { GnbMenuType } from '@/types/initialDataTypes';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function GnbMenu({
  menuName,
  main = false,
  link,
  icon: Icon,
}: GnbMenuType) {
  const currentPage = usePathname();
  const isCurrent = currentPage === link;

  return main ? (
    <li className="px-10">
      <Link href={link}>
        <Icon
          className={cn(
            'absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3.5 size-[58px] rounded-3xl bg-primary outline-7 outline-white'
          )}
        />
      </Link>
    </li>
  ) : (
    <li className="flex flex-col items-center w-full space-y-0">
      <Link href={link}>
        <Icon
          className={cn(
            ' stroke-primary-dark-50 cursor-pointer',
            isCurrent && 'ease-in stroke-navy-1'
          )}
        />
      </Link>
      <p
        className={cn(
          'text-[0.625rem] text-primary-dark-50',
          isCurrent && 'text-navy-1'
        )}
      >
        {menuName}
      </p>
    </li>
  );
}
