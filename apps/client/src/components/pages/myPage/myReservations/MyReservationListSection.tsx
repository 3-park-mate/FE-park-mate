'use client';
import { useState } from 'react';
import { HomeTabMenu } from '../../home/HomeTabMenu';
import ActiveReservations from './ActiveReservations';
import CompletedReservations from './CompletedReservations';

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
      {tabMenu === 'reservationParking' && <ActiveReservations />}
      {tabMenu === 'currentParking' && <CompletedReservations />}
    </>
  );
}
