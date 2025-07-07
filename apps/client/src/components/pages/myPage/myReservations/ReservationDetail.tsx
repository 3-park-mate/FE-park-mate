import { formatDateParts, formatDuration } from '@/utils/datetimeUtils';
import ReservationInfoList from '../../../common/ReservationInfoList';
import DetailInfo from './DetailInfo';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import AddressSection from './AddressSection';
import ReservationActionButtons from '@/components/common/ReservationActionButtons';
import OrderInfoSection from './OrderInfoSection';
import { ReservationListItemDataType } from '@/types/reservationDataTypes';
import { ParkingLotOverviewData } from '@/types/parkingDataTypes';
import { OrderDetailDataType } from '@/types/orderDataTypes';

export default function ReservationDetail({
  reservationData,
  overviewData,
  orderData,
}: {
  reservationData: ReservationListItemDataType;
  overviewData: ParkingLotOverviewData;
  orderData: OrderDetailDataType;
}) {
  const entry = formatDateParts(reservationData.entryTime);
  const exit = formatDateParts(reservationData.exitTime);
  const duration = formatDuration(
    reservationData.entryTime,
    reservationData.exitTime
  );
  const canCancel =
    reservationData.status === 'WAITING' ||
    reservationData.status === 'CONFIRMED';

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
        parkingLotName={reservationData.parkingLotName}
        status={reservationData.status}
        thumbnailUrl={overviewData.thumbnailUrl}
      />
      <AddressSection
        parkingLotUuid={reservationData.parkingLotUuid}
        mainAddress={overviewData.mainAddress}
        detailAddress={overviewData.detailAddress}
        latitude={overviewData.latitude}
        longitude={overviewData.longitude}
      />
      <ReservationInfoList timeItems={timeItems} infoItems={infoItems} />
      <hr />
      {orderData && (
        <>
          {' '}
          <OrderInfoSection orderData={orderData} />
          <hr />
        </>
      )}
      <ReservationActionButtons
        showQrButton={canCancel}
        showCancelButton={canCancel}
        parkingLotUuid={reservationData.parkingLotUuid}
        parkingLotName={reservationData.parkingLotName}
        reservationCode={reservationData.reservationCode}
      />
    </PaddedSection>
  );
}
