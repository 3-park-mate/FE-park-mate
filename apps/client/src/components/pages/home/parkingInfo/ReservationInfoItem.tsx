'use client';
import { useState } from 'react';
import ParkingLocation from './ParkingLocation';
import ParkingTime from './ParkingTime';
import InfoToggleButton from './InfoToggleButton';
import { ReservationInfoItemDataType } from '@/types/reservationType';
import ParkingQRModal from './qrModal/ParkingQRModal';
import { useDistance } from '@/hooks/useDistance';
import ReservationActionButtons from '@/components/common/ReservationActionButtons';

export default function ReservationInfoItem({
  parkingLotUuid,
  parkingLotName,
  parkingSpotName,
  entryTime,
  exitTime,
  vehicleNumber,
  reservationCode,
}: ReservationInfoItemDataType) {
  const [isOpen, setIsOpen] = useState(false);
  const [isQRModalOpen, setQRModalOpen] = useState(false);
  const distance = useDistance(parkingLotUuid);

  return (
    <>
      <ParkingQRModal
        isOpen={isQRModalOpen}
        onClose={() => setQRModalOpen(false)}
        parkingLotUuid={parkingLotUuid}
        entryTime={entryTime}
        exitTime={exitTime}
        parkingSpotName={parkingSpotName}
        vehicleNumber={vehicleNumber}
      />
      <ParkingLocation
        parkingLotName={parkingLotName}
        parkingSpotName={parkingSpotName}
        vehicleNumber={vehicleNumber}
        parkingLotDistance={distance ?? undefined}
        onQRClick={() => setQRModalOpen(true)}
      />
      <div>
        <div
          className={`transition-all duration-400 overflow-hidden space-y-6 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <hr />
          <ParkingTime entryTime={entryTime} exitTime={exitTime} />
          <hr />
          <div className="gap-3 items-center pb-9 pt-3 xs:px-14">
            <ReservationActionButtons
              showCancelButton
              parkingLotUuid={parkingLotUuid}
              parkingLotName={parkingLotName}
              reservationCode={reservationCode}
            />
          </div>
        </div>
        <InfoToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
