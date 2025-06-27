'use client';

import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Button } from '@repo/ui/components/base/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@repo/ui/components/base/radio-group';
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';

export const AvailableParkingSpotCounts: AvailableParkingSpotCountsType[] = [
  { label: '전기차', parkingSpotType: 'EV', availableSpotCount: 10 },

  { label: '경차', parkingSpotType: 'SMALL', availableSpotCount: 10 },
  { label: '소형차', parkingSpotType: 'COMPACT', availableSpotCount: 10 },
  { label: '중형차', parkingSpotType: 'STANDARD', availableSpotCount: 10 },
  { label: '대형차', parkingSpotType: 'LARGE', availableSpotCount: 10 },
];

export type ParkingSpotType = 'EV' | 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

export interface AvailableParkingSpotCountsType {
  label: string;
  parkingSpotType: ParkingSpotType;
  availableSpotCount: number;
}

export const SelectParkingSpotCardMap: Record<
  ParkingSpotType,
  {
    label: string;
    selectedClass: string;
    unselectedClass: string;
  }
> = {
  EV: {
    label: '전기차',
    selectedClass: 'bg-green-gray/30 ring-green text-green-700 shadow-lg',
    unselectedClass: 'bg-green-gray/30 border-gray-1 text-gray-2',
  },
  SMALL: {
    label: '경차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-none text-gray-2',
  },
  COMPACT: {
    label: '소형차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-gray-1 text-gray-2',
  },
  STANDARD: {
    label: '중형차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-gray-1 text-gray-2',
  },
  LARGE: {
    label: '대형차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-gray-1 text-gray-2',
  },
};
export default function AvailableSpotsSheet({
  parkingLotUuid,
  schedule,
}: {
  parkingLotUuid?: string;
  schedule?: { entry: Date; exit: Date };
}) {
  const [spot, setSpot] = useState<ParkingSpotType | undefined>();

  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-8 pb-28 max-w-[600px]"
    >
      <SheetTitle className="mt-10 text-xl">잔여 주차면 수</SheetTitle>
      <p className="text-md leading-2">2025.06.27 13:00 - 2025.06.27 16:00</p>

      <RadioGroup
        value={spot}
        onValueChange={(value: ParkingSpotType) => setSpot(value)}
        className="grid grid-cols-2 gap-2 mt-7"
      >
        {AvailableParkingSpotCounts.map(
          ({ parkingSpotType, label, availableSpotCount }, index) => {
            const isSelected = spot === parkingSpotType;
            const config = SelectParkingSpotCardMap[parkingSpotType];

            return (
              <div
                key={parkingSpotType}
                className={cn(
                  'cursor-pointer ring-1 ring-gray-1 rounded-xl px-3 pt-2 pb-3 mb-2 shadow-lg',
                  index === 0 && 'col-span-2 mb-6',
                  config.unselectedClass,
                  isSelected ? config.selectedClass : config.unselectedClass
                )}
              >
                <RadioGroupItem
                  id={parkingSpotType}
                  value={parkingSpotType}
                  indicatorColor="white"
                />

                <label
                  htmlFor={parkingSpotType}
                  className="flex flex-col items-center"
                >
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-lg font-bold leading-5">
                    {availableSpotCount}면
                  </p>
                </label>
              </div>
            );
          }
        )}
      </RadioGroup>
      <ButtonWrapper className="flex items-center justify-between border-t-1 py-4">
        <p className="font-semibold text-xl">
          <span className="text-sm">총 결제금액:</span> 18,000원
        </p>
        <Button
          className={cn(
            'px-10 h-12 text-lg',
            spot ? 'bg-primary' : 'bg-gray-1'
          )}
        >
          예약하기
        </Button>
      </ButtonWrapper>
      <SheetDescription />
    </SheetContent>
  );
}
