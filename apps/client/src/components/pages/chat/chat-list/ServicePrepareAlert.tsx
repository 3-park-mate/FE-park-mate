'use client';

import AlertModal from '@repo/ui/components/common/AlertModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ServicePrepareAlert() {
  const [alertModalOpen, setAlertModalOpen] = useState(true);
  const router = useRouter();

  return (
    <AlertModal
      open={alertModalOpen}
      onOpenChange={setAlertModalOpen}
      onConfirm={() => router.back()}
      theme="primary"
      errorMessage={`현재 서비스 준비 중입니다.\n빠른 시일 내에 찾아뵙겠습니다.`}
      isPreLine
    />
  );
}
