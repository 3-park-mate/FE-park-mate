'use client';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useRouter } from 'next/navigation';

interface SetDefaultCarButtonProps {
  vehicleUuid: string;
}

export default function SetDefaultCarButton({
  vehicleUuid,
}: SetDefaultCarButtonProps) {
  const router = useRouter();
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();

  const handleSetDefault = async () => {
    // setLoading(true);
    // try {
    //   const res = await setDefaultUserVehicleAction(vehicleUuid);
    //   if (res.success) {
    //     handleAlert('기본 차량으로 설정되었습니다.');
    //     router.refresh();
    //   } else {
    //     handleAlert(res.message);
    //   }
    // } catch (error) {
    //   handleAlert('기본 차량 설정 중 오류가 발생했습니다.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <button
        className="pt-2 text-sm text-blue-600 cursor-pointer hover:text-blue-800"
        onClick={handleSetDefault}
        disabled={loading}
      >
        {loading ? '설정 중...' : '기본 차량 설정'}
      </button>

      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={() => setAlertModalOpen(false)}
      />
    </>
  );
}
