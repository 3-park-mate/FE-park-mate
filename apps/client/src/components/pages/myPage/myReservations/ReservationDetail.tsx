import { formatDateParts, formatDuration } from '@/utils/datetimeUtils';
import ReservationInfoList from '../../../common/ReservationInfoList';
import DetailInfo from './DetailInfo';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import AddressSection from './AddressSection';
import ReservationActionButtons from '@/components/common/ReservationActionButtons';
import OrderInfoSection from './OrderInfoSection';
import { ReservationItemDataType } from '@/types/reservationDataTypes';

export default function ReservationDetail({
  reservationData,
}: {
  reservationData: ReservationItemDataType;
}) {
  const entry = formatDateParts(reservationData.entryTime);
  const exit = formatDateParts(reservationData.exitTime);
  const duration = formatDuration(
    reservationData.entryTime,
    reservationData.exitTime
  );
  const canCancel =
    reservationData.reservationStatus === 'WAITING' ||
    reservationData.reservationStatus === 'CONFIRMED';

  const timeItems = [
    { label: '입차시간', time: entry.time, date: entry.date },
    { label: '출차시간', time: exit.time, date: exit.date },
  ];

  const infoItems = [
    { label: '주차면', value: reservationData.parkingSpotName },
    { label: '차량번호', value: reservationData.vehicleNumber },
    { label: '이용시간', value: duration },
  ];

  return (
    <PaddedSection className="space-y-6 py-5">
      <DetailInfo
        reservationCode={reservationData.reservationCode}
        parkingLotThumbnailUrl={reservationData.parkingLotThumbnailUrl}
        parkingLotName={reservationData.parkingLotName}
        reservationStatus={reservationData.reservationStatus}
      />
      <AddressSection />
      <ReservationInfoList timeItems={timeItems} infoItems={infoItems} />
      <hr />
      <OrderInfoSection />
      <hr />
      <ReservationActionButtons
        showQrButton
        showCancelButton={canCancel}
        parkingLotUuid={reservationData.parkingLotUuid}
        parkingLotName={reservationData.parkingLotName}
      />
    </PaddedSection>
  );
}
