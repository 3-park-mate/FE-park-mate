import { ParkingTimeDataType } from '@/types/parkingDataTypes';

export default function ParkingTime({
  entryTime,
  exitTime,
}: ParkingTimeDataType) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <div className="text-[15px] flex justify-between items-center">
      <p>{formatDate(entryTime)}</p>
      <div className="w-3 h-0.5 bg-primary"></div>
      <p>{formatDate(exitTime)}</p>
    </div>
  );
}
