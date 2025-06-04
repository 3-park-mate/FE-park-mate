'use client';

import { useEffect, useState } from 'react';
import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import AlertBell from '../common/AlertBell';
import { cn } from '@repo/ui/lib/utils';

export default function HomeMainHeader({
  title,
  className,
  icon,
  isShadow = false,
}: {
  title?: string;
  className?: string;
  icon?: React.ReactNode;
  isShadow?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full max-w-[600px] h-[65px] flex justify-between items-center bg-white p-5 space-x-3 z-50',
        (isScrolled || isShadow) && 'shadow-md'
      )}
    >
      <div className="w-full flex items-center gap-2">
        {icon && icon}
        <p className={cn('text-[0.813rem] font-semibold', className)}>
          {title}
        </p>
      </div>
      <SearchIcon className="size-[24px] flex-none" />
      <AlertBell count={4} />
    </header>
  );
}
