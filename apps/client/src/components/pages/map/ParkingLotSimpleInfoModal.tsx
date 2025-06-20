'use client';

import { parkingLotSimpleInfoDummyData } from '@/data/markerDummyData';
import React, { useEffect, useState } from 'react';
import HeadingWithSubtext from '../../common/HeadingWithSubtext';
import RatingOverview from './RatingOverview';
import Image from 'next/image';
import { Circle } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';

export default function ParkingLotSimpleInfoModal({
  clickMarker,
}: {
  clickMarker: string;
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
        'fixed bottom-7 left-1/2 transform -translate-x-1/2 w-23/24 max-w-[600px] px-4 transition-all duration-200 ease-in-out',
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
    >
      <div className={cn('rounded-2xl px-[24px] py-[18px] bg-white shadow-xl')}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <HeadingWithSubtext heading={parkingLotSimpleInfo.name}>
              {parkingLotSimpleInfo.address}
            </HeadingWithSubtext>
            {/* 충전타입 배지 추가 */}
            <Circle className="fill-black" />
            <RatingOverview {...ratingOverviewInfo} />
          </div>
          <AlwaysVisibleTooltip side="top" content="1시간 5,000원">
            <Image
              src={parkingLotSimpleInfo.thumbnailUrl}
              alt={parkingLotSimpleInfo.name}
              width={90}
              height={90}
              className="rounded-lg"
            />
          </AlwaysVisibleTooltip>
        </div>
      </div>
      <div className="flex mt-5 justify-between items-center gap-0">
        <CommonButton className="bg-primary text-[20px] h-12 text-white">
          예약하기<span className="text-17px">(12/20)</span>
        </CommonButton>
      </div>
    </div>
  );
}
