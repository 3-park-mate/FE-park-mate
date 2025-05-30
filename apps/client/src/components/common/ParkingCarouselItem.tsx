import { ParkingCarouselItemDataType } from '@/types/parkingDataTypes';
import ParkingSpotDetail from '@repo/ui/components/common/ParkingSpotDetail';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ParkingCarouselItem({
  parkingLotUuid,
  name,
  distance,
  thumbnailUrl,
  baseFee,
  averageRating,
}: ParkingCarouselItemDataType) {
  return (
    <div>
      <Link href="#">
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
          <div className="absolute bottom-2 right-2 text-xs bg-primary-dark-50 px-2 py-1 rounded-lg shadow-md">
            {baseFee.toLocaleString()}원
            <span className="text-[10px] text-black/80">/1시간</span>
          </div>
        </div>
      </Link>
      <Link href="#" className="inline-block">
        <p className="text-15px pb-0.5">{name}</p>
      </Link>
      <p className="flex items-center gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2" /> {`${distance}m`}
      </p>
      <p className="flex items-center gap-1 text-13px pt-1">
        <Star fill="currentColor" className="text-[#ffc800]" size={14} />
        {averageRating}
      </p>
    </div>
  );
}
