'use client';
import { useState } from 'react';
import ParkingLocation from './ParkingLocation';
import ParkingTime from './ParkingTime';
import InfoToggleButton from './InfoToggleButton';
import {
  parkingLocationDummy,
  parkingTimeDummy,
} from '@/data/parkingDummyDatas';
import { Button } from '@repo/ui/components/base/button';

export default function ReservationInfoItem() {
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
          <div className="flex justify-center gap-3 items-center pb-9 pt-3">
            <Button className="w-36 text-black">예약내역 확인</Button>
            <Button className="w-36 bg-white border border-red-1 text-red-1">
              예약취소
            </Button>
          </div>
        </div>
        <InfoToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
