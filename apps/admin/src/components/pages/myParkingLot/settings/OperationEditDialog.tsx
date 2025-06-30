'use client';
import {
  OperationDataType,
  OperationStoreDataType,
} from '@/types/parkingDataTypes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import { Button } from '@repo/ui/components/base/button';
import { FormProvider, useForm } from 'react-hook-form';
import { handleKeyDown } from '@/utils/formUtils';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import OperationEditFields from './OperationEditFields';
import {
  AddParkingOperationAction,
  UpdateParkingOperationAction,
} from '@/actions/parking/parking-service';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { operationEditSchema } from '@/schemas/operationEditSchema';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { toLocalISOString } from '@/utils/datetimeUtils';

function getInitialFormValues(
  operation?: OperationDataType
): OperationStoreDataType {
  return {
    validStartTime: operation?.validStartTime ?? '',
    validEndTime: operation?.validEndTime ?? '',
    baseIntervalMinutes: operation?.baseIntervalMinutes ?? 30,
    baseFee: operation?.baseFee ?? 0,
    extraIntervalMinutes: operation?.extraIntervalMinutes ?? 10,
    extraFee: operation?.extraFee ?? 0,
    discountRate: operation?.discountRate ?? 0,
  };
}

export default function OperationEditDialog({
  type = 'add',
  operation,
  selectedDate,
}: {
  type?: 'add' | 'update';
  operation?: OperationDataType;
  selectedDate: string;
}) {
  const params = useParams();
  const parkingLotUuid =
    operation?.parkingLotUuid ?? (params.parkingLotUuid as string);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();

  const methods = useForm<OperationStoreDataType>({
    resolver: zodResolver(operationEditSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getInitialFormValues(operation),
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    reset(getInitialFormValues(operation));
  }, [operation, reset]);

  const onSubmit = async (data: OperationStoreDataType) => {
    setLoading(true);

    const toISO = (time: string) => {
      return toLocalISOString(new Date(`${selectedDate}T${time}:00`));
    };

    const payload: OperationStoreDataType = {
      ...data,
      validStartTime: toISO(data.validStartTime),
      validEndTime: toISO(data.validEndTime),
    };
    console.log(payload);

    let res;
    if (type === 'update' && operation) {
      res = await UpdateParkingOperationAction(
        parkingLotUuid,
        operation.parkingOperationUuid,
        payload
      );
    } else {
      res = await AddParkingOperationAction(
        parkingLotUuid,
        selectedDate,
        payload
      );
    }

    if (!res.success) return handleAlert(res.message);

    setIsSuccess(true);
    handleAlert('저장되었습니다.');
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        theme="secondary"
        onConfirm={isSuccess ? () => window.location.reload() : undefined}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full h-10 mt-4">
            {operation ? '운영 정보 수정하기' : '운영 정보 등록하기'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>운영 정보 {operation ? '수정' : '등록'}</DialogTitle>
            {operation?.operationDate && (
              <p className="text-15px text-gray-2">{operation.operationDate}</p>
            )}
          </DialogHeader>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
              onKeyDown={handleKeyDown}
            >
              <OperationEditFields />
              <DialogFooter className="mt-7">
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={loading || !isValid}
                >
                  {loading ? <DotSpinner /> : '저장'}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
