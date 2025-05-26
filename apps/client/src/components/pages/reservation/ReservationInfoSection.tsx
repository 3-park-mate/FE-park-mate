'use client';

import React, { useState } from 'react';
import ScheduleInfoBox from './ScheduleInfoBox';

export default function ReservationInfoSection() {
  const [select, setSelect] = useState('');
  return (
    <section className="space-y-4 pt-5">
      <div onClick={() => setSelect('location')} className="w-full">
        <ScheduleInfoBox select={select} />
      </div>
      {/* <ReservationInfoBox boxName="위치" buttonName="장소 추가" />
      <ReservationInfoBox boxName="날짜" buttonName="날짜 추가" />
      <ReservationInfoBox boxName="차량" buttonName="차량 정보 추가" /> */}
    </section>
  );
}
