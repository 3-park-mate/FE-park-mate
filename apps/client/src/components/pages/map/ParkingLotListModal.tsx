import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { cn } from '@repo/ui/lib/utils';
import { ChevronDown } from 'lucide-react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import ParkingLotListCard from './ParkingLotListCard';
import ShowListModalButton from './ShowListModalButton';
import ParkingLotListSkeleton from './ParkingLotListSkeleton';
import Link from 'next/link';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';

export default function ParkingLotListModal({
  isOpenListModal,
  clickMarker,
  setIsOpenListModal,
  parkingLotList,
  isLoading,
}: {
  isOpenListModal: boolean;
  clickMarker: ParkingLotSimpleInfoType | null;
  setIsOpenListModal: React.Dispatch<SetStateAction<boolean>>;
  parkingLotList: ParkingLotsInBoxResponseType;
  isLoading: boolean;
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
          onClick={() => {
            setIsOpenListModal(false);
            setGnbNavBar(true);
          }}
        >
          <ChevronDown className="mx-auto size-7 text-gray-2" />
        </div>
        <ul>
          {isLoading
            ? // 로딩 중일 때 스켈레톤 표시
              Array.from({ length: 5 }).map((_, index) => (
                <li key={`skeleton-${index}`}>
                  <ParkingLotListSkeleton />
                  {index !== 4 && <hr className="mt-5" />}
                </li>
              ))
            : // 데이터가 있을 때 실제 리스트 표시
              parkingLotList.parkingLots.map((data, index) => (
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
