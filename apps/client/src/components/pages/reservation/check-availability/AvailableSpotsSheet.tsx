'use client';

import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
export const AvailableParkingSpotCounts: AvailableParkingSpotCountsType[] = [
  { label: '전기차', parkingSpotType: 'ev', availableSpotCount: 10 },
  { label: '경차', parkingSpotType: 'SMALL', availableSpotCount: 10 },
  { label: '소형차', parkingSpotType: 'COMPACT', availableSpotCount: 10 },
  { label: '중형차', parkingSpotType: 'STANDARD', availableSpotCount: 10 },
  { label: '대형차', parkingSpotType: 'LARGE', availableSpotCount: 10 },
];

export type ParkingSpotType = 'ev' | 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

export interface AvailableParkingSpotType {
  parkingSpotType: ParkingSpotType;
}

export interface AvailableParkingSpotCountsType {
  label: string;
  parkingSpotType: ParkingSpotType;
  availableSpotCount: number;
}

export default function AvailableSpotsSheet() {
  const [spot, setSpot] = useState<AvailableParkingSpotType | undefined>();
  const evSpot = AvailableParkingSpotCounts.find(
    (spot) => spot.parkingSpotType === 'ev'
  );
  const otherSpots = AvailableParkingSpotCounts.filter(
    (spot) => spot.parkingSpotType !== 'ev'
  );

  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-8 pb-28 max-w-[600px]"
    >
      <SheetTitle className="mt-10 text-xl">잔여 주차면 수</SheetTitle>

      <section className="mt-4">
        <ul className="grid grid-cols-2 gap-2">
          {otherSpots.map(({ label, parkingSpotType, availableSpotCount }) => (
            <li
              key={parkingSpotType}
              className={cn(
                'w-full flex flex-col items-center bg-secondary-gray rounded-xl py-4',
                spot?.parkingSpotType === parkingSpotType && 'bg-secondary'
              )}
              onClick={() => setSpot({ parkingSpotType })}
            >
              <p className="text-sm font-medium">{label}</p>
              <p className="text-lg font-bold">{availableSpotCount}면</p>
            </li>
          ))}
        </ul>
      </section>

      {evSpot && (
        <section className="mt-2">
          <div
            className={cn(
              'bg-green-gray rounded-xl py-4 px-4 text-center',
              spot?.parkingSpotType === evSpot.parkingSpotType && 'bg-green'
            )}
            onClick={() => setSpot({ parkingSpotType: evSpot.parkingSpotType })}
          >
            <p className="text-sm font-medium">{evSpot.label}</p>
            <p className="text-lg font-bold">{evSpot.availableSpotCount}면</p>
          </div>
        </section>
      )}

      <SheetDescription />
    </SheetContent>
  );
}
