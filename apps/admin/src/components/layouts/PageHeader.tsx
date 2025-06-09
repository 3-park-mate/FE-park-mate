'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderLayout } from '@repo/ui/components/common/CommonLayouts';
import BackButton from './BackButton';
import AlertModal from '@repo/ui/components/common/AlertModal';

export default function PageHeader({
  title,
  type = 'default',
  className,
}: {
  title?: string;
  type?: 'default' | 'form';
  className?: string;
}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

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
      <HeaderLayout className={className} isShadow={isScrolled}>
        <div className="absolute left-0 flex justify-center">
          <BackButton className="ml-5" onClick={handleBackClick} />
        </div>
        <h1 className="font-semibold">{title}</h1>
      </HeaderLayout>
    </>
  );
}
