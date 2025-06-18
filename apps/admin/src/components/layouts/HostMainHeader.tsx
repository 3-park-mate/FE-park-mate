'use client';

import { useEffect, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from './BackButton';
import { BellIcon } from 'lucide-react';
import HostLogo from '../common/HostLogo';

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
        <HostLogo />
        <span className="text-gray-2">|</span>
        <p className={cn('font-semibold', className)}>{title}</p>
      </div>
      <BellIcon className="text-secondary" />
    </HeaderLayout>
  );
}
