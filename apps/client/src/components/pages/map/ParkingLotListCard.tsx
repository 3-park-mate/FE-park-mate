import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { DotIcon } from 'lucide-react';
import React from 'react';
import RatingOverview from './RatingOverview';
import Image from 'next/image';

export default function ParkingLotListCard({
  parkingLotInfo,
}: {
  parkingLotInfo: ParkingLotSimpleInfoType;
}) {
  return (
    <>
      <p className="font-medium">{parkingLotInfo.name}</p>
      <RatingOverview
        reviewSummaryData={{
          averageRating: parkingLotInfo.rating,
          totalReviews: parkingLotInfo.totalReviews,
        }}
        likeCount={parkingLotInfo.likeCount}
        dislikeCount={parkingLotInfo.dislikeCount}
      />
      <p className="flex items-center text-gray-2 text-sm">
        <span className="">{parkingLotInfo.distance}km </span>
        <DotIcon className="size-4" />
        <span className="">{parkingLotInfo.address}</span>
      </p>
      <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide mt-2">
        {parkingLotInfo.imageUrls.length > 0 &&
          parkingLotInfo.imageUrls?.map((image, index) => (
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
