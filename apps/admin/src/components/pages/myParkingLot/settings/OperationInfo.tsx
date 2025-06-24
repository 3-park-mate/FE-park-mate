import { OperationDataType } from '@/types/parkingDataTypes';
import { formatDateParts } from '@/utils/datetimeUtils';
import OperationInfoDetail from './OperationInfoDetail';
import { Button } from '@repo/ui/components/base/button';

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
      <Button variant="secondary" className="w-full h-10 mt-4">
        {operation ? '운영 정보 수정하기' : '운영 정보 등록하기'}
      </Button>
      {operation && (
        <Button className="w-full h-10  bg-white border border-red-1 text-red-1 mt-2">
          운영 정보 삭제
        </Button>
      )}
    </div>
  );
}
