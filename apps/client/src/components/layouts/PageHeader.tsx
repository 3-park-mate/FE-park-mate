'use client';
import { cn } from '@repo/ui/lib/utils';
import BackButton from './BackButton';
import { usePathname } from 'next/navigation';

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

  return (
    <header
      className={cn(
        'h-13 flex items-center justify-center relative',
        className
      )}
    >
      <div className="absolute left-0 flex justify-center">
        <BackButton className="ml-3" />
      </div>
      <h1 className="font-semibold">{title}</h1>
    </header>
  );
}
