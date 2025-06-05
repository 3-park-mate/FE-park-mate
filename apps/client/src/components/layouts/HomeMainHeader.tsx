'use client';

import { useEffect, useState } from 'react';
import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import AlertBell from '../common/AlertBell';
import { cn } from '@repo/ui/lib/utils';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from './BackButton';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';

export default function HomeMainHeader({
  title,
  type = 'backButton',
  className,
  isShadow = false,
}: {
  title?: string;
  type: 'location' | 'backButton';
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
    <HeaderLayout
      className={cn('p-5 space-x-3 z-50', className)}
      isShadow={isShadow || isScrolled}
    >
      <div className="w-full flex items-center gap-2">
        {type === 'location' ? <MarkerIcon /> : <BackButton />}
        <p
          className={cn(
            'font-semibold',
            type === 'location' && 'text-13px',
            className
          )}
        >
          {title}
        </p>
      </div>
      {type === 'location' && <SearchIcon className="size-[24px] flex-none" />}
      <AlertBell count={4} />
    </HeaderLayout>
  );
}
