'use client';

import { TabMenuWithIconType } from '@/types/searchDataTypes';
import { cn } from '@repo/ui/lib/utils';
import { XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TabMenuWithIcon({
  tabMenuList,
  closeButton = false,
  className,
}: {
  tabMenuList: TabMenuWithIconType[];
  closeButton?: boolean;
  className?: string;
}) {
  const path = usePathname();
  const router = useRouter();
  return (
    <ul
      className={cn(
        'relative flex justify-center items-center gap-15 pt-3 w-full max-w-[600px] bg-gray-light-3',
        className
      )}
    >
      {tabMenuList.map((menu) => (
        <li
          key={menu.id}
          id={menu.id}
          onClick={() => router.replace(`/${menu.id}`)}
          role="tab"
          className="flex flex-col items-center gap-2"
        >
          {menu.icon && <menu.icon className="size-9 stroke-[0.09rem]" />}
          <p
            className={cn(
              'font-medium border-b-4 border-transparent transition-all duration-300',
              path === `/${menu.id}` && 'border-black text-black'
            )}
          >
            {menu.title}
          </p>
        </li>
      ))}
      {closeButton && (
        <XIcon
          onClick={() => router.back()}
          className="absolute right-6 size-9 transform bg-white rounded-full p-1 shadow-md"
        />
      )}
    </ul>
  );
}
