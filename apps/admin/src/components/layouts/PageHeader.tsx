'use client';
import { useEffect, useState } from 'react';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from './BackButton';

export default function PageHeader({
  title,
  className,
}: {
  title?: string;
  className?: string;
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
    <HeaderLayout className={className} isShadow={isScrolled}>
      <div className="absolute left-0 flex justify-center">
        <BackButton className="ml-5" />
      </div>
      <h1 className="font-semibold">{title}</h1>
    </HeaderLayout>
  );
}
