import { parkingLotListDummyData } from '@/data/markerDummyData';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { MarkerDataType } from '@/types/mapDataTypes';
import { cn } from '@repo/ui/lib/utils';
import { AlignJustifyIcon, DotIcon } from 'lucide-react';
import React, { SetStateAction } from 'react';
import RatingOverview from './RatingOverview';
import Image from 'next/image';

export default function ParkingLotListModal({
  isOpenListModal,
  clickMarker,
  setIsOpenListModal,
  markerData,
}: {
  isOpenListModal: boolean;
  clickMarker: string;
  setIsOpenListModal: React.Dispatch<SetStateAction<boolean>>;
  markerData: MarkerDataType[];
}) {
  const { setGnbNavBar } = useGnbNavBarStore();
  const parkingLotListDummy = parkingLotListDummyData;
  return (
    <>
      <section
        className={cn(
          'fixed bottom-0 w-full max-w-[600px] max-h-1/2 rounded-t-3xl overflow-y-scroll scrollbar-hide bg-white z-50 cursor-pointer',
          'transform transition-transform duration-300 ease-in-out',
          isOpenListModal ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="sticky top-0 w-full bg-white py-2.5">
          <AlignJustifyIcon className="mx-5 rounded-full shadow-md p-1.5 size-[35px] text-gray-2 " />
        </div>
        <ul>
          {parkingLotListDummy.map((data, index) => (
            <li key={index} className="py-3 px-6">
              <p className="font-medium">{data.name}</p>
              <RatingOverview
                averageRating={data.averageRating}
                reviewCount={data.reviewCount}
                likeCount={data.likeCount}
                dislikeCount={data.dislikeCount}
              />
              <p className="flex items-center text-gray-2 text-sm">
                <span className="">{data.distance}m </span>
                <DotIcon className="size-4" />
                <span className="">{data.address}</span>
              </p>
              <div className="flex gap-4 flex-nowrap overflow-x-auto scrollbar-hide mt-2">
                {data.thumbnailUrls.map((image, index) => (
                  <Image
                    className="h-[90px]"
                    key={index}
                    src={image}
                    alt={image}
                    width={90}
                    height={90}
                  />
                ))}
              </div>
              {index !== parkingLotListDummy.length - 1 && (
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
