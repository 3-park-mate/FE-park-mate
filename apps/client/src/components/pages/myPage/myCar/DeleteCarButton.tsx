'use client';
import { DeleteUserVehicleAction } from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteCarButton({
  vehicleUuid,
}: {
  vehicleUuid: string;
}) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();

  const handleDelete = async () => {
    setLoading(true);
    const res = await DeleteUserVehicleAction(vehicleUuid);
    if (!res.success) return handleAlert(res.message);
    handleAlert('차량이 삭제되었습니다.');
    setLoading(false);
    setIsSuccess(true);
  };

  return (
    <>
      <button
        className="pt-2 text-sm text-gray-2 cursor-pointer hover:text-gray-700"
        onClick={() => handleAlert('정말로 삭제하시겠습니까?')}
        disabled={loading}
      >
        삭제
      </button>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={
          isSuccess
            ? () => {
                router.refresh();
              }
            : handleDelete
        }
        showCancelButton={!isSuccess}
      />
    </>
  );
}
