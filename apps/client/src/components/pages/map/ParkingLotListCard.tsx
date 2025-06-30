import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { DotIcon } from 'lucide-react';
import React from 'react';
import RatingOverview from './RatingOverview';
import Image from 'next/image';

export default function ParkingLotListCard({
  parkingLot,
}: {
  parkingLot: ParkingLotSimpleInfoType;
}) {
  return (
    <>
      <p className="font-medium">{parkingLot.name}</p>
      <RatingOverview
        averageRating={4.5}
        reviewCount={5000}
        likeCount={300}
        dislikeCount={5}
      />
      <p className="flex items-center text-gray-2 text-sm">
        <span className="">{parkingLot.distance}km </span>
        <DotIcon className="size-4" />
        <span className="">{parkingLot.address}</span>
      </p>
      <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide mt-2">
        {parkingLot.imageUrls.length > 0 &&
          parkingLot.imageUrls?.map((image, index) => (
            <Image
              className="object-cover rounded-sm"
              key={index}
              src={image.imageUrl}
              alt={image.imageUrl}
              width={120}
              height={90}
            />
          ))}
      </div>
    </>
  );
}
