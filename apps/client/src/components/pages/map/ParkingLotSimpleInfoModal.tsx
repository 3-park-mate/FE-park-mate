'use client';

import { useCallback, useEffect, useState } from 'react';
import HeadingWithSubtext from '../../common/HeadingWithSubtext';
import RatingOverview from './RatingOverview';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';
import { getParkingLotById } from '@/actions/parking/parking-service';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import Evchargetypebadges from './EvChargeTypeBadges';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useFetchData } from '@/hooks/useFetchData';

export default function ParkingLotSimpleInfoModal({
  clickMarker,
}: {
  clickMarker: ParkingLotSimpleInfoType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = useCallback(
    () => getParkingLotById(clickMarker.parkingLotUuid),
    [clickMarker.parkingLotUuid]
  );

  const { data: parkingLotData, loading } =
    useFetchData<ParkingLotResponseDataType>(fetcher);

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
      {loading ? (
        <div
          className={cn(
            'rounded-2xl px-[24px] py-[18px] bg-white shadow-xl flex justify-center items-center min-h-[130px]'
          )}
        >
          <DotSpinner className="fill-primary size-8" />
        </div>
      ) : (
        <Link href={`parking-lot/${clickMarker.parkingLotUuid}`}>
          <div className={cn('rounded-2xl px-4.5 py-4 bg-white shadow-xl')}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <HeadingWithSubtext
                  heading={parkingLotData?.name || ''}
                  className="leading-7"
                  tight
                >
                  {parkingLotData?.address}
                </HeadingWithSubtext>
                {parkingLotData?.evChargeTypes && (
                  <Evchargetypebadges
                    evChargeTypes={parkingLotData?.evChargeTypes}
                  />
                )}
                <RatingOverview
                  reviewCount={1}
                  averageRating={4.5}
                  likeCount={parkingLotData?.likeCount}
                  dislikeCount={parkingLotData?.dislikeCount}
                />
              </div>
              <AlwaysVisibleTooltip side="top" content="3,000원/30분">
                {parkingLotData?.thumbnailUrl && (
                  <Image
                    src={parkingLotData.thumbnailUrl}
                    alt={parkingLotData.name}
                    width={90}
                    height={90}
                    className="rounded-lg ml-1 aspect-square object-cover"
                  />
                )}
              </AlwaysVisibleTooltip>
            </div>
          </div>
        </Link>
      )}

      <div className="flex mt-5 justify-between items-center gap-0">
        <CommonButton className="bg-primary text-[20px] h-12 text-white">
          예약하기
          <span className="text-17px tracking-tighter">
            ( {clickMarker.availableSpotCount} / {parkingLotData?.capacity} )
          </span>
        </CommonButton>
      </div>
    </div>
  );
}
