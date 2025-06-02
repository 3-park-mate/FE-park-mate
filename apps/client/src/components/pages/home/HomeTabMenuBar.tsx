'use client';

import { useState } from 'react';
import { HomeTabMenu } from './HomeTabMenu';
import { HomeTabBarProps } from '@/types/initialDataTypes';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export function HomeTabMenuBar({ tabContents }: HomeTabBarProps) {
  const [tabMenu, setTabMenu] = useState<
    'reservationParking' | 'currentParking'
  >('reservationParking');

  return (
    <>
      <ul className="fixed top-[64px] w-full max-w-[600px] flex justify-between bg-inner-background-gray z-50">
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
      <PaddedLayout className="py-7 pt-38">
        {tabMenu === 'reservationParking'
          ? tabContents.reservationParking
          : tabContents.currentParking}
      </PaddedLayout>
    </>
  );
}
