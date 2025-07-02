'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import { Input } from '@repo/ui/components/base/input';
import { useFormContext } from 'react-hook-form';
import { Button } from '@repo/ui/components/base/button';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { cn } from '@repo/ui/lib/utils';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';
import Image from 'next/image';
import RatingOverview from '../map/RatingOverview';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { formatDateParts } from '@/utils/datetimeUtils';
import AmountInfo from '../check-availability/AmountInfo';
import ParkingLotSimpleInfoCard from '@/components/common/ParkingLotSimpleInfoCard';

export default function ConfirmReservationSheet({
  parkingLotData,
  open,
  onOpenChange,
  onSubmit,
}: {
  parkingLotData: ParkingLotResponseDataType;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSubmit: () => void;
}) {
  const { register, watch } = useFormContext<CreateReservationRequestType>();
  const schedule = watch('schedule');
  const parkingSpotType = watch('parkingSpotType');
  if (
    !open ||
    !schedule?.entryDateTime ||
    !schedule?.exitDateTime ||
    !parkingSpotType
  ) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="fixed h-11/12 left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-6 pb-28 max-w-[600px] z-50"
      >
        <SheetTitle />
        <HeadingWithDesc
          heading="예약 정보 확인"
          subHeading="입력하긴 예약 정보를 확인하고 차량번호를 입력해주세요"
        />
        <div className="border-1 rounded-2xl flex flex-col py-6 px-6 gap-5">
          <ParkingLotSimpleInfoCard
            parkingLotData={parkingLotData}
            showEvBadge={false}
            imageAlign="left"
          />
          {/* <div className="flex w-full items-center gap-5">
            <Image
              src={
                parkingLotData.thumbnailUrl || 'https://dummyimage.com/100x100'
              }
              alt={parkingLotData.name}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div>
              <p>{parkingLotData.name}</p>
              <p>{parkingLotData.address}</p>
              <RatingOverview
                averageRating={99}
                reviewCount={999}
                likeCount={parkingLotData.likeCount}
                dislikeCount={parkingLotData.dislikeCount}
              />
            </div>
          </div> */}
          <div className="w-full text-left">
            <p className="text-lg font-semibold">예약 상세정보</p>
            <p className="text-md">
              입차: {formatDateParts(schedule.entryDateTime.toString()).date}{' '}
              {formatDateParts(schedule.entryDateTime.toString()).time}
            </p>
            <p className="text-md">
              출차: {formatDateParts(schedule.exitDateTime.toString()).date}{' '}
              {formatDateParts(schedule.exitDateTime.toString()).time}
            </p>
            <p className="text-md">타입: {parkingSpotType}</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <label className="block text-xl font-medium">차량 번호</label>
          <Input
            placeholder="예: 12가 3456"
            {...register('carNumber', { required: true })}
          />
        </div>

        <ButtonWrapper className="flex justify-between items-center border-t-1 pt-6">
          <AmountInfo type="total" />
          <div className="space-x-5">
            <Button
              type="submit"
              onClick={onSubmit}
              className={cn(
                'h-12 bg-primary text-white rounded-full px-6 text-lg'
              )}
            >
              결제하기
            </Button>
          </div>
        </ButtonWrapper>

        <SheetDescription />
      </SheetContent>
    </Sheet>
  );
}
