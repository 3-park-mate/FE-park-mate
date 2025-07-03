'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import { Input } from '@repo/ui/components/base/input';
import { useFormContext } from 'react-hook-form';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { useEffect, useRef } from 'react';
import ReservationSummaryCard from './ReservationSummaryCard';
import ReservationSubmitButton from './ReservationSubmitButton';

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
  const { register, watch, getValues } =
    useFormContext<CreateReservationRequestType>();
  const endRef = useRef<HTMLDivElement | null>(null);
  const entryTime = watch('entryTime');
  const exitTime = watch('exitTime');
  const parkingSpotType = watch('parkingSpotType');

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!open || !entryTime || !exitTime || !parkingSpotType) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="fixed h-11/12 left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-6 pb-28 max-w-[600px] "
      >
        <SheetTitle />
        <HeadingWithDesc
          heading="예약 정보 확인"
          subHeading="입력하긴 예약 정보를 확인하고 차량번호를 입력해주세요"
        />
        <section className="overflow-y-scroll scrollbar-hide">
          <ReservationSummaryCard
            reservationInfo={getValues()}
            parkingLotData={parkingLotData}
          />
          {/* 드롭다운으로 변경 + 내 차량 조회 연결 */}
          <div className="my-8 space-y-3">
            <label className="block text-xl font-medium">차량 번호</label>
            <Input
              placeholder="예: 12가 3456"
              {...register('carNumber', { required: true })}
            />
          </div>
          <div ref={endRef} />
        </section>
        <ReservationSubmitButton onSubmit={onSubmit} />
        <SheetDescription />
      </SheetContent>
    </Sheet>
  );
}
