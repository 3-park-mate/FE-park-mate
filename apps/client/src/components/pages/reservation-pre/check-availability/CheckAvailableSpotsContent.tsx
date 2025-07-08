'use client';

import { SelectParkingSpotCardMap } from '@/data/initialDatas';
import {
  AvailableSpotsResponseType,
  ParkingSpotTypeWithEV,
} from '@/types/parkingDataTypes';
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
import { useFormContext } from 'react-hook-form';
import { formatDate } from '@/utils/datetimeUtils';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import ReservationSheetButton from './CheckAvailableSpotsButton';

export default function CheckAvailableSpotsContent({
  availableSpots,
  onClickReserve,
}: {
  availableSpots: AvailableSpotsResponseType | null;
  onClickReserve: () => void;
}) {
  const { watch, setValue } = useFormContext<CreateReservationRequestType>();
  const selectedType = watch('parkingSpotType');
  const entryTime = watch('entryTime');
  const exitTime = watch('exitTime');
  if (!entryTime || !exitTime) {
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
        {formatDate(entryTime.toString())} - {formatDate(exitTime.toString())}
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
          const disable = count === 0;

          return (
            <div
              key={parkingSpotType}
              className={cn(
                'cursor-pointer ring-1 ring-gray-1 rounded-xl px-3 pt-2 pb-3 mb-2 shadow-lg',
                parkingSpotType === 'EV' && 'col-span-2 mb-6',
                config.unselectedClass,
                isSelected ? config.selectedClass : config.unselectedClass,
                disable && 'bg-gray-1/70'
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

                <p
                  className={cn(
                    'text-lg font-bold leading-5',
                    disable && 'text-gray-2'
                  )}
                >
                  {count}면
                  {disable && (
                    <span className="text-sm font-medium"> (예약 불가)</span>
                  )}
                </p>
              </label>
            </div>
          );
        })}
      </RadioGroup>
      <ReservationSheetButton
        onClick={onClickReserve}
        label="예약하기"
        className="px-10 text-xl"
      />
      <SheetDescription />
    </SheetContent>
  );
}
