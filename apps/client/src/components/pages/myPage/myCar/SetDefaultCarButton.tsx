'use client';
import { UpdateDefaultVehicleAction } from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SetDefaultCarButtonProps {
  vehicleUuid: string;
}

export default function SetDefaultCarButton({
  vehicleUuid,
}: SetDefaultCarButtonProps) {
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

  const handleSetDefault = async () => {
    setLoading(true);
    const res = await UpdateDefaultVehicleAction(vehicleUuid);
    if (!res.success) return handleAlert(res.message);
    handleAlert(res.data);
    setLoading(false);
    setIsSuccess(true);
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={
          isSuccess
            ? () => {
                router.refresh();
              }
            : handleSetDefault
        }
        showCancelButton={!isSuccess}
      />
      <button
        className="text-primary-dark-50 cursor-pointer"
        onClick={() => handleAlert('기본 차량으로 설정하시겠습니까?')}
        disabled={loading}
      >
        {loading ? '설정 중...' : '기본 차량 설정'}
      </button>
    </>
  );
}
