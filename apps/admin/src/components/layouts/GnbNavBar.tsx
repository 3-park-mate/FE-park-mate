'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/ui/lib/utils';
import { gnbNavItems } from '@/data/initialDatas';

export default function GnbNavBar() {
  const pathname = usePathname();

  return (
    <nav className="max-w-[600px] w-full fixed bottom-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {gnbNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full text-xs',
                isActive ? 'text-secondary' : 'text-gray-3'
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
