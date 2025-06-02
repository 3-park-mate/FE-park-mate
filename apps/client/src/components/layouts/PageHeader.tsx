'use client';
import { cn } from '@repo/ui/lib/utils';
import BackButton from './BackButton';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageHeader({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  const path = usePathname();
  if (!title) {
    if (path === '/sign-in') {
      title = '로그인';
    } else if (path === '/sign-up') {
      title = '회원가입';
    } else {
      title = '';
    }
  }
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
    <>
      <header
        className={cn(
          'h-13 flex items-center justify-center relative z-100 max-w-[600px] mx-auto',
          'fixed top-0 left-0 right-0 bg-white transition-shadow',
          isScrolled && 'shadow-md',
          className
        )}
      >
        <div className="absolute left-0 flex justify-center">
          <BackButton className="ml-3" />
        </div>
        <h1 className="font-semibold">{title}</h1>
      </header>
      <div className="h-13"></div>
    </>
  );
}
