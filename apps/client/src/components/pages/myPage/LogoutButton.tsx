'use client';
import { LogoutAction } from '@/actions/auth/auth-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function LogoutButton() {
  const { alertModalOpen, setAlertModalOpen, modalMessage, handleAlert } =
    useAlertWithLoading();
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(
    () => () => {}
  );

  const handleConfirm = () => {
    setOnConfirmCallback(() => handleLogout);
    handleAlert('로그아웃 하시겠습니까?');
  };
  const handleLogout = async () => {
    const res = await LogoutAction();
    if (res.success === false) {
      setOnConfirmCallback(() => () => {});
      handleAlert(`로그아웃 중 오류가 발생했습니다.: ${res.message}`);
      setAlertModalOpen(true);
    } else {
      await signOut({ redirect: true, callbackUrl: '/' });
    }
  };
  return (
    <div className="flex justify-center">
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        onConfirm={onConfirmCallback}
        errorMessage={modalMessage}
        showCancelButton={modalMessage === '로그아웃 하시겠습니까?'}
      />
      <button
        onClick={handleConfirm}
        className="text-sm text-gray-2 cursor-pointer underline mt-2"
      >
        로그아웃
      </button>
    </div>
  );
}
