'use client';

import { Ref, RefObject, useCallback, useEffect, useRef } from 'react';
import { cn } from '@repo/ui/lib/utils';
import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';
import { getParkingLotById } from '@/actions/parking/parking-service';
import {
  ParkingLotResponseDataType,
  ReviewSummaryDataType,
} from '@/types/parkingDataTypes';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useFetchData } from '@/hooks/useFetchData';
import ParkingLotSimpleInfoCard from '@/components/common/ParkingLotSimpleInfoCard';
import { getReviewSummaryData } from '@/actions/review/review-service';

export default function ParkingLotSimpleInfoModal({
  selectedParkingLot,
}: {
  selectedParkingLot: ParkingLotSimpleInfoType;
}) {
  const parkingLotFetcher = useCallback(
    () => getParkingLotById(selectedParkingLot.parkingLotUuid),
    [selectedParkingLot.parkingLotUuid]
  );

  const { data: parkingLotData, loading: loadingParkingLot } =
    useFetchData<ParkingLotResponseDataType>(parkingLotFetcher);

  const reviewSummaryFetcher = useCallback(
    () => getReviewSummaryData(selectedParkingLot.parkingLotUuid),
    [selectedParkingLot.parkingLotUuid]
  );
  const { data: reviewSummaryData, loading: loadingReviews } =
    useFetchData<ReviewSummaryDataType>(reviewSummaryFetcher);

  const isLoading = loadingParkingLot || loadingReviews;

  return (
    <div
      className={cn(
        'fixed bottom-7 left-1/2 transform -translate-x-1/2 w-23/24 max-w-[600px] px-4 transition-all duration-200 ease-in-out z-50',
        selectedParkingLot
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      )}
    >
      {isLoading || !parkingLotData || !reviewSummaryData ? (
        <div
          className={cn(
            'rounded-2xl px-[24px] py-[18px] bg-white shadow-xl flex justify-center items-center min-h-[120px]'
          )}
        >
          <DotSpinner className="fill-primary size-8" />
        </div>
      ) : (
        <Link href={`parking-lot/${selectedParkingLot.parkingLotUuid}`}>
          <AlwaysVisibleTooltip side="top" content="3,000원/30분">
            <ParkingLotSimpleInfoCard
              reviewSummaryData={reviewSummaryData}
              parkingLotData={parkingLotData}
              className="rounded-2xl px-4.5 py-4 bg-white shadow-xl justify-between"
            />
          </AlwaysVisibleTooltip>
        </Link>
      )}
      <Link
        href={`/reservation-pre/${selectedParkingLot.parkingLotUuid}`}
        className="flex mt-5 justify-between items-center gap-0"
      >
        <CommonButton className="bg-primary text-[20px] h-12 text-white">
          예약하기
          <span className="text-17px tracking-tighter">
            ( {selectedParkingLot.availableSpotCount} /{' '}
            {parkingLotData?.capacity} )
          </span>
        </CommonButton>{' '}
      </Link>
    </div>
  );
}
