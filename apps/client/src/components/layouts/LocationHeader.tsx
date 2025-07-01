'use client';

import { useEffect, useState } from 'react';
import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import AlertBell from '../common/AlertBell';
import { cn } from '@repo/ui/lib/utils';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';
import MapPinIcon from '@repo/ui/components/icon/MapPinIcon';
import LocationContent from './LocationContent';

export default function LocationHeader({
  className,
  withEmptySpace = true,
  isShadow = false,
}: {
  className?: string;
  withEmptySpace?: boolean;
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
      withEmptySpace={withEmptySpace}
    >
      <div className="w-full p-1 flex items-center gap-2">
        <MapPinIcon />
        <LocationContent />
      </div>
      <Link href="/search-location">
        <SearchIcon className="size-[24px] flex-none cursor-pointer" />
      </Link>
      <AlertBell />
    </HeaderLayout>
  );
}
