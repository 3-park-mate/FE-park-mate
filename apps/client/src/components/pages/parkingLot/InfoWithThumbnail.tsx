'use client';
import Image from 'next/image';
import { Car, MapPin } from 'lucide-react';
import {
  CommonPriceBadge,
  IconWithText,
  Rating,
} from '@repo/ui/components/common/CommonLayouts';
import BadgeCheckIcon from '@repo/ui/components/icon/BadgeCheckIcon';
import { ParkingLotType } from '@/types/parkingDataTypes';
import { useDistance } from '@/hooks/useDistance';

export default function InfoWithThumbnail({
  parkingLotUuid,
  thumbImageUrl,
  baseFee,
  name,
  averageRating,
  totalReviews,
  capacity,
  parkingLotType,
  baseIntervalMinutes,
}: {
  parkingLotUuid: string;
  thumbImageUrl?: string;
  baseFee?: number;
  name: string;
  averageRating: number;
  totalReviews: number;
  capacity: number;
  parkingLotType: ParkingLotType;
  baseIntervalMinutes?: number;
}) {
  const distance = useDistance(parkingLotUuid);
  return (
    <section className="relative">
      <div className="aspect-[155/102] flex items-center justify-center relative">
        <Image
          src={thumbImageUrl ?? '/img/no-image.png'}
          alt="주차장 이미지"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 600px) 100vw 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex justify-between items-start mb-2">
            {parkingLotType === 'COMMERCIAL' && (
              <div className="flex items-center gap-2">
                <span className="text-sm">파크메이트 주차장</span>
                <BadgeCheckIcon size={14} />
              </div>
            )}
            {baseFee && baseIntervalMinutes && (
              <CommonPriceBadge
                className="text-black"
                IntervalMinutes={baseIntervalMinutes}
              >
                {baseFee.toLocaleString()}원
              </CommonPriceBadge>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-shadow-lg">{name}</h1>
          <Rating className="mb-3">
            {averageRating.toFixed(1)} ({totalReviews})
          </Rating>
          <div className="flex items-center gap-4 text-sm">
            {distance && <IconWithText Icon={MapPin}>{distance}m</IconWithText>}
            <IconWithText Icon={Car}>{capacity}면</IconWithText>
          </div>
        </div>
      </div>
    </section>
  );
}
