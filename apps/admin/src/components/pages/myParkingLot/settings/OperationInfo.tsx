import { OperationDataType } from '@/types/parkingDataTypes';
import { formatDateParts } from '@/utils/datetimeUtils';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import OperationInfoDetail from './OperationInfoDetail';

export default function OperationInfo({
  operation,
  selectedDate,
}: {
  operation: OperationDataType | null;
  selectedDate: Date | undefined;
}) {
  return (
    <div className="bg-inner-background-gray rounded-xl p-4 mt-4">
      {selectedDate && (
        <p className="text-sm font-medium mb-3">
          {formatDateParts(selectedDate.toString()).date}
        </p>
      )}
      {operation ? (
        <OperationInfoDetail operation={operation} />
      ) : (
        <p className="text-sm text-gray-500">
          해당 날짜에 등록된 운영 정보가 없습니다.
        </p>
      )}
      <CommonButton variant="secondary" className="mt-4">
        운영정보 수정하기
      </CommonButton>
    </div>
  );
}
