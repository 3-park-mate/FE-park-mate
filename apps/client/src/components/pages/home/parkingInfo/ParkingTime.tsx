import { ParkingTimeDataType } from '@/types/parkingDataTypes';
import { formatDate } from '@/utils/datetimeUtils';

export default function ParkingTime({
  entryTime,
  exitTime,
}: ParkingTimeDataType) {
  return (
    <div className="text-15px flex justify-between items-center">
      <p>{formatDate(entryTime)}</p>
      <div className="w-3 h-0.5 bg-primary"></div>
      <p>{formatDate(exitTime)}</p>
    </div>
  );
}
