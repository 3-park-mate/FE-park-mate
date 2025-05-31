import { parkingLotSimpleInfoDummyData } from '@/data/markerDummyData';
import React from 'react';
import RatingOverview from './RatingOverview';
import Image from 'next/image';
import { Circle, Icon } from 'lucide-react';

export default function ParkingLotSimpleInfoModal({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const parkingLotSimpleInfo = parkingLotSimpleInfoDummyData;
  const ratingOverviewInfo = {
    averageRating: parkingLotSimpleInfo.averageRating,
    reviewCount: parkingLotSimpleInfo.reviewCount,
    likeCount: parkingLotSimpleInfo.likeCount,
    dislikeCount: parkingLotSimpleInfo.dislikeCount,
  };

  return (
    <div className="rounded-2xl left-4 bg-white px-[24px] py-[25px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <div>
            <h2 className="text-20px font-semibold">
              {parkingLotSimpleInfo.name}
            </h2>
            <p className="text-14px text-gray-2">
              {parkingLotSimpleInfo.address}
            </p>
          </div>
          {/* 충전타입 배지 추가 */}
          <Circle className="fill-black" />
          <RatingOverview {...ratingOverviewInfo} />
        </div>
        <Image
          src={parkingLotSimpleInfo.thumbnailUrl}
          alt={parkingLotSimpleInfo.name}
          width={80}
          height={80}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
