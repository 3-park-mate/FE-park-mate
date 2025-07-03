'use client';

import { useEffect, useState } from 'react';
import AlertBell from '../common/AlertBell';
import { cn } from '@repo/ui/lib/utils';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from './BackButton';

export default function SimpleHeader({
  title,
  className,
  isShadow = false,
}: {
  title?: string;
  className?: string;
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
      className={cn('p-5 space-x-5 z-50', className)}
      isShadow={isShadow || isScrolled}
    >
      <div className="w-full flex items-center gap-2">
        <BackButton />
        <p
          className={cn(
            'font-semibold',

            className
          )}
        >
          {title}
        </p>
      </div>

      <AlertBell />
    </HeaderLayout>
  );
}
