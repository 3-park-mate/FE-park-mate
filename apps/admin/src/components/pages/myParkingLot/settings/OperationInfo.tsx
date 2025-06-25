import { OperationDataType } from '@/types/parkingDataTypes';
import { formatDateParts, formatDateToYMD } from '@/utils/datetimeUtils';
import OperationInfoDetail from './OperationInfoDetail';
import { Button } from '@repo/ui/components/base/button';
import OperationEditDialog from './OperationEditDialog';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { DeleteParkingOperationAction } from '@/actions/parking/parking-service';
import { useState } from 'react';

export default function OperationInfo({
  operation,
  selectedDate,
}: {
  operation: OperationDataType | null;
  selectedDate: Date;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { alertModalOpen, setAlertModalOpen, modalMessage, handleAlert } =
    useAlertWithLoading();

  const handleDelete = async () => {
    if (!operation) return;

    const res = await DeleteParkingOperationAction(
      operation.parkingLotUuid,
      operation.parkingOperationUuid
    );

    if (res.success) {
      handleAlert('운영 정보가 성공적으로 삭제되었습니다.');
      setIsSuccess(true);
    } else {
      handleAlert(res.message || '운영 정보 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        theme="secondary"
        showCancelButton={!isSuccess}
        onConfirm={isSuccess ? () => window.location.reload() : handleDelete}
      />
      <div className="bg-inner-background-gray rounded-xl p-4 mt-4">
        <p className="text-sm font-medium mb-3">
          {formatDateParts(selectedDate.toString()).date}
        </p>

        {operation ? (
          <OperationInfoDetail operation={operation} />
        ) : (
          <p className="text-sm text-gray-500">
            해당 날짜에 등록된 운영 정보가 없습니다.
          </p>
        )}
        <OperationEditDialog
          operation={operation ?? undefined}
          type={operation ? 'update' : 'add'}
          selectedDate={formatDateToYMD(selectedDate)}
        />
        {operation && (
          <Button
            className="w-full h-10  bg-white border border-red-1 text-red-1 mt-2"
            onClick={() => handleAlert('정말로 삭제하시겠습니까?')}
          >
            운영 정보 삭제
          </Button>
        )}
      </div>
    </>
  );
}
