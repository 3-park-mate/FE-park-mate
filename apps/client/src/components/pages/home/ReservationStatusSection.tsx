import ReservationInfoItem from './parkingInfo/ReservationInfoItem';
import { reservationInfoDummy } from '@/data/reservationDummyDatas';

export default function ReservationStatusSection() {
  return (
    <div className="space-y-6">
      {reservationInfoDummy.map((item) => (
        <ReservationInfoItem key={item.parkingLotUuid} {...item} />
      ))}
    </div>
  );
}
