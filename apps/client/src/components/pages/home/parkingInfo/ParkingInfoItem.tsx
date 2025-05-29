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

export default function ParkingInfoItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ParkingLocation {...parkingLocationDummy} />
      <div>
        <div
          className={`transition-all duration-400 overflow-hidden space-y-6 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <hr />
          <ParkingTime {...parkingTimeDummy} />
          <hr />
          <ParkingProgress />
        </div>
        <InfoToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
