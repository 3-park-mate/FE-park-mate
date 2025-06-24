import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import {
  ParkingLotSimpleInfoType,
  ParkingLotsInBoxResponseType,
} from '@/types/mapDataTypes';
import { cn } from '@repo/ui/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import ParkingLotListCard from './ParkingLotListCard';
import ShowListModalButton from './ShowListModalButton';
import Link from 'next/link';

export default function ParkingLotListModal({
  isOpenListModal,
  clickMarker,
  setIsOpenListModal,
  parkingLotList,
}: {
  isOpenListModal: boolean;
  clickMarker: ParkingLotSimpleInfoType | null;
  setIsOpenListModal: React.Dispatch<SetStateAction<boolean>>;
  parkingLotList: ParkingLotsInBoxResponseType;
}) {
  const { setGnbNavBar } = useGnbNavBarStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
          'fixed bottom-0 w-full max-w-[600px] max-h-1/2 rounded-t-3xl overflow-y-scroll scrollbar-hide bg-white z-30 cursor-pointer',
          'transform transition-transform duration-300 ease-in-out h-1/2',
          isOpenListModal ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div
          className={cn(
            'sticky top-0 w-full bg-white py-2.5',
            isScrolled && 'shadow-sm'
          )}
        >
          <ChevronDown
            className="mx-auto size-7 text-gray-2"
            onClick={() => {
              setIsOpenListModal(false);
              setGnbNavBar(true);
            }}
          />
        </div>
        <ul>
          {parkingLotList.parkingLots.map((data, index) => (
            <li key={data.parkingLotUuid} className="py-3 px-6">
              <Link href={`parking-lot/${data.parkingLotUuid}`}>
                <ParkingLotListCard parkingLot={data} />
                {index !== parkingLotList.parkingLots.length - 1 && (
                  <hr className=" mt-5" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {!isOpenListModal && !clickMarker && (
        <ShowListModalButton setIsOpenListModal={setIsOpenListModal} />
      )}
    </>
  );
}
