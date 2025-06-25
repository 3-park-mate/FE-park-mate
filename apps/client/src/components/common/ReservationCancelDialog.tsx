import { cancelReservationAction } from '@/actions/reservation/reservation-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { handleKeyDown } from '@/utils/formUtils';
import { Button } from '@repo/ui/components/base/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ReservationCancelDialog({
  parkingLotName,
  reservationCode,
}: {
  parkingLotName: string;
  reservationCode: string;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<{ cancelReason: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      cancelReason: '',
    },
  });

  const onSubmit = async (data: { cancelReason: string }) => {
    setLoading(true);

    const res = await cancelReservationAction({
      reservationCode,
      cancelReason: data.cancelReason,
    });
    if (!res.success) return handleAlert(res.message);
    setIsSuccess(true);
    handleAlert('성공적으로 취소 요청되었습니다.');
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={
          isSuccess ? () => router.push('/my-reservations') : undefined
        }
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex-1 bg-white border border-red-1 text-red-1 h-10">
            예약취소
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>예약 취소</DialogTitle>
            <p className="text-15px text-gray-2">{parkingLotName}</p>
          </DialogHeader>
          <form
            className="space-y-4 mt-4"
            onKeyDown={handleKeyDown}
            onSubmit={handleSubmit(onSubmit)}
          >
            <CommonInputWithLabel
              label="취소 사유"
              type="text"
              maxLength={50}
              placeholder="취소 사유를 작성해 주세요. (최대 50자)"
              description="예약이 시작되기 전까지 결제를 취소할 수 있으며, 환불까지 1~2일 소요될 수 있습니다."
              errorMessage={errors.cancelReason?.message}
              {...register('cancelReason', {
                required: '취소 사유를 입력해주세요.',
              })}
            />
            <DialogFooter className="mt-10 h-10">
              <Button
                type="submit"
                disabled={!isValid || loading}
                className="flex-1 bg-white border border-red-1 text-red-1 h-10"
              >
                {loading ? <DotSpinner /> : '예약 취소 요청'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
