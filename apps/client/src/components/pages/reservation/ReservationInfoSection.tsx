'use client';

import React, { useState } from 'react';
import ScheduleInfoBox from './ScheduleInfoBox';
import LocationInfoBox from './LocationInfoBox';
import { ReservationInfoBox } from './ReservationInfoBox';
import { Button } from '@repo/ui/components/base/button';
import ButtonWrapper from '@/components/common/ButtonWrapper';

export default function ReservationInfoSection() {
  const [select, setSelect] = useState<
    'scheduleInfo' | 'locationInfo' | 'vehicleInfo'
  >('scheduleInfo');

  return (
    <main>
      <section className="space-y-4 pt-5">
        <ReservationInfoBox
          boxName="일정"
          buttonName="일정 추가"
          selected={select === 'scheduleInfo'}
          onClick={() => setSelect('scheduleInfo')}
        >
          <ScheduleInfoBox />
        </ReservationInfoBox>
        <ReservationInfoBox
          boxName="위치"
          buttonName="위치 추가"
          selected={select === 'locationInfo'}
          onClick={() => setSelect('locationInfo')}
        >
          <LocationInfoBox />
        </ReservationInfoBox>
        <ReservationInfoBox
          boxName="차량"
          buttonName="차량 정보 추가"
          selected={select === 'vehicleInfo'}
          onClick={() => setSelect('vehicleInfo')}
        />
      </section>
      <ButtonWrapper>
        <Button className="w-full py-6 text-xl font-semibold rounded-xl">
          주차장 찾기
        </Button>
      </ButtonWrapper>
    </main>
  );
}
