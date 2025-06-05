'use client';

import { useEffect, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from './BackButton';
import { BellIcon } from 'lucide-react';

export default function HostMainHeader({
  title,
  type = 'default',
  className,
  isShadow = false,
}: {
  title?: string;
  type?: 'default' | 'backButton';
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
      className={cn('p-5 space-x-3 z-50', className)}
      isShadow={isShadow || isScrolled}
    >
      <div className="w-full flex items-center gap-2">
        {type === 'backButton' && <BackButton />}
        <div className="flex items-baseline gap-1">
          <span className="text-secondary font-extrabold text-xl">
            파크메이트
          </span>
          <span className="text-gray-2 font-semibold text-[19px]">호스트</span>
        </div>
        <span className="text-gray-2">|</span>
        <p className={cn('font-semibold', className)}>{title}</p>
      </div>
      <BellIcon className="text-secondary" />
    </HeaderLayout>
  );
}
