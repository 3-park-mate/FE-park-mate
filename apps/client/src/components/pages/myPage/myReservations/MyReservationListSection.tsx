'use client';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { HomeTabMenu } from '../../home/HomeTabMenu';
import { useState } from 'react';

export default function MyReservationListSection() {
  const [tabMenu, setTabMenu] = useState<
    'reservationParking' | 'currentParking'
  >('reservationParking');

  return (
    <>
      <ul className="fixed w-full max-w-[600px] flex justify-between bg-inner-background-gray z-50">
        <HomeTabMenu
          tabMenuName="이용 예정 및 진행 중"
          selected={tabMenu === 'reservationParking'}
          onClick={() => setTabMenu('reservationParking')}
        />
        <HomeTabMenu
          tabMenuName="이용 완료"
          selected={tabMenu === 'currentParking'}
          onClick={() => setTabMenu('currentParking')}
        />
      </ul>
      <PaddedSection className="pt-[84px]">asd</PaddedSection>
    </>
  );
}
