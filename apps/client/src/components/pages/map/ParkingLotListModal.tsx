'use client';

import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { cn } from '@repo/ui/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ParkingLotListCard from './ParkingLotListCard';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useMapStore } from '@/store/useMapStore';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';

export default function ParkingLotListModal({
  setClickMarker,
  parkingLotList,
  isLoading,
}: {
  setClickMarker: (id: ParkingLotSimpleInfoType) => void;
  parkingLotList: ParkingLotsInBoxResponseType;
  isLoading: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const isOpenListModal = useMapStore((state) => state.isOpenListModal);
  const setIsOpenListModal = useMapStore((state) => state.setIsOpenListModal);

  useEffect(() => {
    const target = modalRef.current;
    if (!target) return;

    const handleScroll = () => {
      setIsScrolled(target.scrollTop > 0);
    };

    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        ref={modalRef}
        className={cn(
          'fixed bottom-0 w-full max-w-[600px] max-h-2/5 rounded-t-3xl overflow-y-scroll scrollbar-hide bg-white z-30 cursor-pointer',
          'transform transition-transform duration-300 ease-in-out h-1/2',
          isOpenListModal ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div
          className={cn(
            'sticky top-0 w-full bg-white py-2.5',
            isScrolled && 'shadow-sm'
          )}
          onClick={() => {
            setIsOpenListModal(false);
          }}
        >
          <ChevronDown className="mx-auto size-7 text-gray-2" />
        </div>
        <ul>
          {isLoading ? (
            <DotSpinner className="mx-auto my-10 size-12 fill-primary text-xl" />
          ) : parkingLotList.parkingLots.length > 0 ? (
            parkingLotList.parkingLots.map((data, index) => (
              <li
                key={data.parkingLotUuid}
                className="py-3 px-6"
                onClick={() => {
                  setClickMarker(data);
                  setIsOpenListModal(false);
                }}
              >
                <ParkingLotListCard parkingLotInfo={data} />
                {index !== parkingLotList.parkingLots.length - 1 && (
                  <hr className=" mt-5" />
                )}
              </li>
            ))
          ) : (
            <p className="text-center mt-15">
              예약 가능한 주차장이 존재하지 않습니다.
            </p>
          )}
        </ul>
      </div>
    </>
  );
}
