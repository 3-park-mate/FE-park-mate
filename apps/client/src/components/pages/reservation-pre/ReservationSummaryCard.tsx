'use client';

import { formatDateParts } from '@/utils/datetimeUtils';
import { ParkingSpotLabelMap } from '@/data/initialDatas';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import ParkingLotSimpleInfoCard from '@/components/common/ParkingLotSimpleInfoCard';
import InfoRow from '@/components/common/InfoRow';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';

export default function ReservationSummaryCard({
  reservationInfo,
  parkingLotData,
}: {
  reservationInfo: CreateReservationRequestType;
  parkingLotData: ParkingLotResponseDataType;
}) {
  return (
    <div className="border-1 rounded-2xl flex flex-col pt-4 pb-6 px-6 gap-5 border-gray-light-2 z-50">
      <ParkingLotSimpleInfoCard
        parkingLotData={parkingLotData}
        showEvBadge={false}
        imageAlign="left"
      />
      <hr className="h-1 border-gray-light-2" />
      <div>
        <p className="text-lg font-semibold mb-1">상세정보</p>
        <div className="w-full text-left font-light leading-tight space-y-1.5">
          <InfoRow
            label="입차"
            value={
              `${formatDateParts(reservationInfo.entryTime!.toString()).date} ` +
              `${formatDateParts(reservationInfo.entryTime!.toString()).time}`
            }
          />
          <InfoRow
            label="출차"
            value={
              `${formatDateParts(reservationInfo.exitTime!.toString()).date} ` +
              `${formatDateParts(reservationInfo.exitTime!.toString()).time}`
            }
          />
          <InfoRow
            label="타입"
            value={
              ParkingSpotLabelMap[reservationInfo.parkingSpotType!]?.label ??
              reservationInfo.parkingSpotType
            }
          />
        </div>
      </div>
    </div>
  );
}
