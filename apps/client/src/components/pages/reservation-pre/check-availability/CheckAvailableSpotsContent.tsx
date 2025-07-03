'use client';

import ButtonWrapper from '@/components/common/ButtonWrapper';
import { SelectParkingSpotCardMap } from '@/data/initialDatas';
import {
  AvailableSpotsResponseType,
  ParkingSpotTypeWithEV,
} from '@/types/parkingDataTypes';
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
import AmountInfo from './AmountInfo';
import { useFormContext } from 'react-hook-form';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { formatDate } from '@/utils/datetimeUtils';

export default function CheckAvailableSpotsContent({
  availableSpots,
  onClickReserve,
}: {
  availableSpots: AvailableSpotsResponseType | null;
  onClickReserve: () => void;
}) {
  const { watch, setValue } = useFormContext<CreateReservationRequestType>();
  const selectedType = watch('parkingSpotType');
  const schedule = watch('schedule');
  if (!schedule?.entryDateTime || !schedule?.exitDateTime) {
    return null;
  }

  const displayData = availableSpots ?? {};
  const sortedEntries = Object.entries(displayData).sort(([a], [b]) => {
    if (a === 'EV') return -1;
    if (b === 'EV') return 1;
    return 0;
  });

  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-8 pb-28 max-w-[600px] z-50"
    >
      <SheetTitle className="mt-10 text-xl">잔여 주차면 수</SheetTitle>
      <p className="text-md ">
        {formatDate(schedule.entryDateTime.toString())} -{' '}
        {formatDate(schedule.exitDateTime.toString())}
      </p>

      <RadioGroup
        value={selectedType}
        className="grid grid-cols-2 gap-2 mt-7"
        onValueChange={(type: string) => {
          setValue('parkingSpotType', type as ParkingSpotTypeWithEV);
        }}
      >
        {sortedEntries.map(([type, count]) => {
          const parkingSpotType = type as ParkingSpotTypeWithEV;
          const config = SelectParkingSpotCardMap[parkingSpotType];
          const isSelected = selectedType === parkingSpotType;

          return (
            <div
              key={parkingSpotType}
              className={cn(
                'cursor-pointer ring-1 ring-gray-1 rounded-xl px-3 pt-2 pb-3 mb-2 shadow-lg',
                parkingSpotType === 'EV' && 'col-span-2 mb-6',
                config.unselectedClass,
                isSelected ? config.selectedClass : config.unselectedClass
              )}
            >
              <RadioGroupItem
                id={parkingSpotType}
                value={parkingSpotType}
                indicatorColor="white"
                disabled={count === 0}
              />
              <label
                htmlFor={parkingSpotType}
                className="flex flex-col items-center"
              >
                <p className="text-sm font-medium">{config.label}</p>
                <p className="text-lg font-bold leading-5">{count}면</p>
              </label>
            </div>
          );
        })}
      </RadioGroup>

      <ButtonWrapper className="flex justify-between items-center border-t-1 pt-4">
        <AmountInfo type="total" />
        <Button
          onClick={onClickReserve}
          className={cn(
            'px-10 h-12 text-lg',
            selectedType ? 'bg-primary' : 'bg-gray-1'
          )}
        >
          예약하기
        </Button>
      </ButtonWrapper>
      <SheetDescription />
    </SheetContent>
  );
}
