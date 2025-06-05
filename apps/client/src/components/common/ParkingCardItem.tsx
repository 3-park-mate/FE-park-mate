'use client';
import { ParkingCarouselItemDataType } from '@/types/parkingDataTypes';
import {
  CommonPriceBadge,
  Rating,
} from '@repo/ui/components/common/CommonLayouts';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function ParkingCardlItem({
  parkingLotUuid,
  name,
  distance,
  thumbnailUrl,
  baseFee,
  averageRating,
}: ParkingCarouselItemDataType) {
  return (
    <div className="">
      <Link href={`/parking-lot/${parkingLotUuid}`}>
        <div
          className="relative rounded-md overflow-hidden 
        bg-gray-1 flex aspect-[3/2] mb-1.5"
        >
          <Image
            src={thumbnailUrl}
            alt="주차장 이미지"
            fill
            className="object-cover"
          />
          <FavoriteButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // 즐겨찾기 토글 처리
            }}
          />
          <CommonPriceBadge className="absolute bottom-2 right-2">
            {baseFee.toLocaleString()}원
          </CommonPriceBadge>
        </div>
      </Link>
      <Link href={`/parking-lot/${parkingLotUuid}`} className="inline-block">
        <p className="text-15px pb-0.5 font-semibold">{name}</p>
      </Link>
      <p className="flex items-center gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2" /> {`${distance}m`}
      </p>
      <Rating>{averageRating}</Rating>
    </div>
  );
}
