import { ParkingQRDataType } from '@/types/parkingDataTypes';
import { formatDateParts } from '@/utils/datetimeUtils';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import ReservationInfoList from '../../../../common/ReservationInfoList';
import QRcodeBoxSection from './QRcodeBoxSection';
import ReservationActionButtons from '@/components/common/ReservationActionButtons';

export default function ParkingQRInfo({
  parkingLotUuid,
  parkingSpotName,
  vehicleNumber,
  entryTime,
  exitTime,
}: ParkingQRDataType) {
  const entry = formatDateParts(entryTime);
  const exit = formatDateParts(exitTime);

  const timeItems = [
    { label: '입차시간', time: entry.time, date: entry.date },
    { label: '출차시간', time: exit.time, date: exit.date },
  ];

  const infoItems = [
    { label: '주차면', value: parkingSpotName },
    { label: '차량번호', value: vehicleNumber },
    { label: '이용시간', value: '3시간' },
  ];

  return (
    <PaddedLayout className="py-4 space-y-5">
      <div className="bg-white rounded-lg shadow-md py-6">
        <QRcodeBoxSection />
        <hr className="w-full border-t border-dashed border-gray-1 my-8" />
        <ReservationInfoList
          timeItems={timeItems}
          infoItems={infoItems}
          className="px-6"
        />
      </div>
      <ReservationActionButtons
        showCancelButton
        parkingLotUuid={parkingLotUuid}
      />
    </PaddedLayout>
  );
}
