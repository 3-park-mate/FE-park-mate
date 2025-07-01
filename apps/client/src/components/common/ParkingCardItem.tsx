'use client';
import { Rating } from '@repo/ui/components/common/CommonLayouts';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { useFetchData } from '@/hooks/useFetchData';
import { ParkingLotSimpleDataType } from '@/types/parkingDataTypes';
import { getSimpleParkingLotById } from '@/actions/parking/parking-service';
import { useCallback } from 'react';

export default function ParkingCardItem({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const fetcher = useCallback(
    () => getSimpleParkingLotById(parkingLotUuid),
    [parkingLotUuid]
  );

  const { data: parkingLotData } =
    useFetchData<ParkingLotSimpleDataType>(fetcher);
  if (!parkingLotData) return;

  return (
    <div>
      <Link href={`/parking-lot/${parkingLotUuid}`}>
        <div
          className="relative rounded-md overflow-hidden 
        bg-gray-1 flex aspect-[3/2] mb-1.5"
        >
          <Image
            src={parkingLotData.thumbnailUrl || '/img/no-image.png'}
            alt="주차장 이미지"
            fill
            sizes=""
            className="object-cover"
          />
          <FavoriteButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // 즐겨찾기 토글 처리
            }}
          />
        </div>
      </Link>
      <Link href={`/parking-lot/${parkingLotUuid}`} className="inline-block">
        <p className="text-15px pb-0.5 font-semibold">{parkingLotData.name}</p>
      </Link>
      <p className="flex gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2 shrink-0 mt-[3px]" />
        {parkingLotData.address}
      </p>
      {parkingLotData.rating > 0 && <Rating>{parkingLotData.rating}</Rating>}
    </div>
  );
}
