'use client';
import BackButton from './BackButton';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';

export default function PageHeader({
  title,
  type = 'default',
  isShadow = true,
  className,
}: {
  title?: string;
  type?: 'default' | 'form';
  isShadow?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackClick = () => {
    if (type === 'form') {
      setAlertModalOpen(true);
    } else {
      router.back();
    }
  };

  return (
    <HeaderLayout className={className} isShadow={isShadow && isScrolled}>
      <div className="absolute left-0 flex justify-center">
        <BackButton className="ml-5" onClick={handleBackClick} />
      </div>
      <h1 className="font-semibold">{title}</h1>
    </HeaderLayout>
  );
}
