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
  console.log(path);
  return (
    <ul
      className={cn(
        'relative flex justify-center items-center gap-8 pt-3 w-full max-w-[600px] bg-gray-light-3',
        className
      )}
    >
      {tabMenuList.map((menu) => (
        <li
          key={menu.id}
          id={menu.id}
          onClick={() => router.replace(`${menu.href}`)}
          role="tab"
          className={cn(
            'flex flex-col items-center justify-center gap-1 rounded-xl size-18 pt-1 transition-all duration-300',
            path === menu.href ? 'bg-white/60 shadow-lg' : 'bg-transparent'
          )}
        >
          {menu.icon && (
            <menu.icon
              className={cn(
                'size-8 stroke-[0.09rem] stroke-gray-2',
                path === menu.href && 'stroke-black'
              )}
            />
          )}
          <p
            className={cn(
              'font-medium text-sm text-gray-2 border-b-4 border-transparent leading-tight transition-all duration-300',
              path === menu.href && 'text-black'
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
