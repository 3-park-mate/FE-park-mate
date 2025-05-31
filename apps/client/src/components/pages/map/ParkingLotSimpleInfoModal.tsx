'use client';

import { parkingLotSimpleInfoDummyData } from '@/data/markerDummyData';
import React, { useEffect, useState } from 'react';
import RatingOverview from './RatingOverview';
import Image from 'next/image';
import { Circle } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/base/button';
import ButtonWrapper from '@/components/common/ButtonWrapper';

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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[600px] px-4 transition-all duration-200 ease-in-out',
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
    >
      <div className={cn('rounded-2xl px-[24px] py-[25px] bg-white shadow-xl')}>
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
            width={90}
            height={90}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex mt-5 justify-between items-center gap-0">
        <Button className="h-11 w-11/23 rounded-lg bg-gray-2 text-lg font-semibold text-white shadow-lg">
          문의하기
        </Button>
        <Button className="h-11 w-11/23 rounded-lg text-lg font-semibold text-white bg-primary shadow-lg">
          예약하기
        </Button>
      </div>
    </div>
  );
}
