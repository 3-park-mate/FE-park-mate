import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { ParkingLotsInBoxResponseType } from '@/types/mapDataTypes';
import { cn } from '@repo/ui/lib/utils';
import { AlignJustifyIcon, ChevronDown } from 'lucide-react';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import ParkingLotListCard from './ParkingLotListCard';

export default function ParkingLotListModal({
  isOpenListModal,
  clickMarker,
  setIsOpenListModal,
  parkingLotList,
}: {
  isOpenListModal: boolean;
  clickMarker: string;
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
      <section
        ref={modalRef}
        className={cn(
          'fixed bottom-0 w-full max-w-[600px] max-h-1/2 rounded-t-3xl overflow-y-scroll scrollbar-hide bg-white z-50 cursor-pointer',
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
            <li key={index} className="py-3 px-6">
              <ParkingLotListCard parkingLot={data} />
              {index !== parkingLotList.parkingLots.length - 1 && (
                <hr className=" mt-5" />
              )}
            </li>
          ))}
        </ul>
      </section>
      {!isOpenListModal && !clickMarker && (
        <button
          className={cn(
            'fixed left-1/2 -translate-x-1/2 bottom-25 flex items-center shadow-md bg-white px-4 py-2 rounded-full gap-1 hover:bg-gray-100'
          )}
          onClick={() => {
            setIsOpenListModal(true);
            setGnbNavBar(false);
          }}
        >
          <AlignJustifyIcon className="size-4" />
          <p className="text-sm">목록보기</p>
        </button>
      )}
    </>
  );
}
