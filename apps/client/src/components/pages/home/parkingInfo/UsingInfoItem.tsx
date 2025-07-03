'use client';
import { useState } from 'react';
import ParkingLocation from './ParkingLocation';
import ParkingTime from './ParkingTime';
import ParkingProgress from './ParkingProgress';
import InfoToggleButton from './InfoToggleButton';
import ParkingQRModal from './qrModal/ParkingQRModal';
import { useDistance } from '@/hooks/useDistance';

export default function UsingInfoItem({
  parkingLotUuid,
  parkingLotName,
  parkingSpotName,
  vehicleNumber,
  entryTime,
  exitTime,
}: {
  parkingLotUuid: string;
  parkingLotName: string;
  parkingSpotName: string;
  vehicleNumber: string;
  entryTime: string;
  exitTime: string;
}) {
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
        parkingLotUuid={parkingLotUuid}
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
          <ParkingProgress entryTime={entryTime} exitTime={exitTime} />
        </div>
        <InfoToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
