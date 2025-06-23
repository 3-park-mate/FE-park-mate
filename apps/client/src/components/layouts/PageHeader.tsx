'use client';
import BackButton from './BackButton';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import AlertModal from '@repo/ui/components/common/AlertModal';

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

  const handleModalConfirm = () => {
    setAlertModalOpen(false);
    router.back();
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        onConfirm={handleModalConfirm}
        showCancelButton={true}
        theme="secondary"
        errorMessage="현재 페이지에서 나가면 입력된 정보가 사라집니다. 계속하시겠습니까?"
      />
      <HeaderLayout className={className} isShadow={isShadow && isScrolled}>
        <div className="absolute left-0 flex justify-center">
          <BackButton className="ml-5" onClick={handleBackClick} />
        </div>
        <h1 className="font-semibold">{title}</h1>
      </HeaderLayout>
    </>
  );
}
