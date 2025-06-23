'use client';

import React, { useEffect, useState } from 'react';
import HeadingWithSubtext from '../../common/HeadingWithSubtext';
import RatingOverview from './RatingOverview';
import Image from 'next/image';
import { Circle } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { getParkingLotInfoById } from '@/actions/map/map-service';
import { ParkingLotInfoType } from '@/types/mapDataTypes';

export default function ParkingLotSimpleInfoModal({
  clickMarker,
}: {
  clickMarker: string;
}) {
  const [parkingLotSimpleInfo, setParkingLotSimpleInfo] =
    useState<ParkingLotInfoType>();
  console.log(clickMarker, '주차장 uuid');

  useEffect(() => {
    if (!clickMarker) return;

    const fetchData = async () => {
      try {
        const data = await getParkingLotInfoById(clickMarker);
        setParkingLotSimpleInfo(data);
      } catch (error) {
        console.error('주차장 정보 로드 실패:', error);
      }
    };

    fetchData();
  }, [clickMarker]);

  const ratingOverviewInfo = {
    averageRating: 4.5,
    reviewCount: 1200,
    likeCount: parkingLotSimpleInfo?.likeCount || 0,
    dislikeCount: parkingLotSimpleInfo?.dislikeCount || 0,
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
            <HeadingWithSubtext heading={parkingLotSimpleInfo?.name || ''}>
              {parkingLotSimpleInfo?.address}
            </HeadingWithSubtext>
            {/* 충전타입 배지 추가 */}
            <Circle className="fill-black" />
            <RatingOverview {...ratingOverviewInfo} />
          </div>
          <AlwaysVisibleTooltip side="top" content="1시간 5,000원">
            {parkingLotSimpleInfo?.thumbnailUrl && (
              <Image
                src={parkingLotSimpleInfo.thumbnailUrl}
                alt={parkingLotSimpleInfo.name}
                width={90}
                height={90}
                className="rounded-lg"
              />
            )}
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
