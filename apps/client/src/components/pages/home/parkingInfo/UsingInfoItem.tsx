'use client';

import { useState } from 'react';
import ParkingLocation from './ParkingLocation';
import ParkingTime from './ParkingTime';
import ParkingProgress from './ParkingProgress';
import InfoToggleButton from './InfoToggleButton';
import {
  parkingLocationDummy,
  parkingTimeDummy,
} from '@/data/parkingDummyDatas';
import ParkingQRModal from './qrModal/ParkingQRModal';

export default function UsingInfoItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQRModalOpen, setQRModalOpen] = useState(false);
  const {
    parkingLotUuid,
    parkingLotName,
    parkingLotDistance,
    parkingSpotName,
    vehicleNumber,
  } = parkingLocationDummy;
  const { exitTime, entryTime } = parkingTimeDummy;

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
        parkingLotDistance={100}
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
          <ParkingProgress />
        </div>
        <InfoToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
