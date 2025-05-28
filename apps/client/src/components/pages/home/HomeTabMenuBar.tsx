'use client';

import { useState } from 'react';
import { HomeTabMenu } from './HomeTabMenu';
import { HomeTabBarProps } from '@/types/homeTabType';

export function HomeTabMenuBar({ children }: HomeTabBarProps) {
  const [tabMenu, setTabMenu] = useState<
    'reservationParking' | 'currentParking'
  >('reservationParking');

  return (
    <>
      <ul className="flex justify-between bg-inner-background-gray">
        <HomeTabMenu
          tabMenuName="예약 주차장"
          selected={tabMenu === 'reservationParking'}
          onClick={() => setTabMenu('reservationParking')}
        />
        <HomeTabMenu
          tabMenuName="이용중 주차장"
          selected={tabMenu === 'currentParking'}
          onClick={() => setTabMenu('currentParking')}
        />
      </ul>
      <div className="px-4 py-2">
        {tabMenu === 'reservationParking'
          ? children.reservationParking
          : children.currentParking}
      </div>
    </>
  );
}
