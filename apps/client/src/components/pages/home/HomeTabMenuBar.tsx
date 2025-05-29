'use client';

import { useState } from 'react';
import { HomeTabMenu } from './HomeTabMenu';
import { HomeTabBarProps } from '@/types/homeTabType';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export function HomeTabMenuBar({ tabContents }: HomeTabBarProps) {
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
      <PaddedLayout className="py-7">
        {tabMenu === 'reservationParking'
          ? tabContents.reservationParking
          : tabContents.currentParking}
      </PaddedLayout>
    </>
  );
}
