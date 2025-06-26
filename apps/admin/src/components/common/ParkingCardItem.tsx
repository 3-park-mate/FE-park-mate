'use client';
import { ParkingLotItem } from '@/types/parkingDataTypes';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function ParkingCardItem({
  parkingLotUuid,
  name,
  mainAddress,
  detailAddress,
  thumbnailUrl,
}: ParkingLotItem) {
  const isOperating = true;

  return (
    <div>
      <Link href={`/my-parking-lot/${parkingLotUuid}`}>
        <div
          className="relative rounded-md overflow-hidden 
        bg-gray-1 flex aspect-[3/2] mb-1.5"
        >
          <Image
            src={thumbnailUrl || `/img/no-image.png`}
            alt="주차장 이미지"
            fill
            className="object-cover"
          />
          <div
            className={cn(
              'absolute bottom-2 right-2 text-xs text-white px-2 py-1 rounded-lg',
              isOperating ? 'bg-secondary' : 'bg-gray-400'
            )}
          >
            {isOperating ? '운영중' : '운영준비중'}
          </div>
        </div>
      </Link>
      <Link href={`/parking-lot/${parkingLotUuid}`} className="inline-block">
        <p className="text-15px pb-0.5 font-semibold">{name}</p>
      </Link>
      <p className="flex gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2 shrink-0 mt-[3px]" />
        {mainAddress}
      </p>
      {/* {averageRating && <Rating>{averageRating}</Rating>} */}
    </div>
  );
}
