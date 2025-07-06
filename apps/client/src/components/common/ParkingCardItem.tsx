'use client';
import { Rating } from '@repo/ui/components/common/CommonLayouts';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';
import Link from 'next/link';

import { ParkingLotSimpleDataType } from '@/types/parkingDataTypes';

export default function ParkingCardItem({
  parkingLotData,
}: {
  parkingLotData: ParkingLotSimpleDataType;
}) {
  const displayRating =
    typeof parkingLotData.rating === 'number'
      ? parkingLotData.rating.toFixed(1)
      : '0.0';
  return (
    <div>
      <Link href={`/parking-lot/${parkingLotData.parkingLotUuid}`}>
        <div
          className="relative rounded-md overflow-hidden 
        bg-gray-1 flex aspect-[3/2] mb-1.5"
        >
          <Image
            src={parkingLotData.thumbnailUrl || '/img/no-image.png'}
            alt="주차장 이미지"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {/* <FavoriteButton /> */}
        </div>
      </Link>
      <Link
        href={`/parking-lot/${parkingLotData.parkingLotUuid}`}
        className="inline-block"
      >
        <p className="text-15px pb-0.5 font-semibold">{parkingLotData.name}</p>
      </Link>
      <p className="flex gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2 shrink-0 mt-[3px]" />
        {parkingLotData.distance
          ? `${parkingLotData.distance}km`
          : parkingLotData.address}
      </p>

      <Rating>{displayRating}</Rating>
    </div>
  );
}
