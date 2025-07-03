'use client';
import { useState } from 'react';
import ParkingLocation from './ParkingLocation';
import ParkingTime from './ParkingTime';
import InfoToggleButton from './InfoToggleButton';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import { ReservationInfoItemDataType } from '@/types/reservationType';
import Link from 'next/link';
import ParkingQRModal from './qrModal/ParkingQRModal';
import { useDistance } from '@/hooks/useDistance';

export default function ReservationInfoItem({
  parkingLotUuid,
  parkingLotName,
  parkingSpotName,
  entryTime,
  exitTime,
  vehicleNumber,
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
          <div className="flex justify-center gap-3 items-center pb-9 pt-3">
            <Button className="w-36 bg-white border border-red-1 text-red-1">
              예약취소
            </Button>
            <Link
              href={`/parking-lot/${parkingLotUuid}`}
              className={`${buttonVariants({ variant: 'default' })} w-36 !text-black`}
            >
              주차장 상세보기
            </Link>
          </div>
        </div>
        <InfoToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
