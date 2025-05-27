'use client';

import React, { useState } from 'react';
import ScheduleInfoBox from './ScheduleInfoBox';
import LocationInfoBox from './LocationInfoBox';
import { ReservationInfoBox } from './ReservationInfoBox';
import { Button } from '@repo/ui/components/base/button';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import VehicleInfoBox from './VehicleInfoBox';

export interface FilterInfoType {
  schedule?: {
    entryTime: string;
    exitTime?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
  evcharge?: number;
}

export default function ReservationInfoSection() {
  const [filterInfo, setFilterInfo] = useState<FilterInfoType>({
    schedule: { entryTime: '', exitTime: '' },
    location: { lat: 0, lng: 0 },
    evcharge: 0,
  });
  const [select, setSelect] = useState<'schedule' | 'location' | 'evcharge'>(
    'schedule'
  );

  return (
    <>
      <section className="space-y-4 pt-5 mx-4">
        <ReservationInfoBox
          id="schedule"
          boxName="일정"
          buttonName="일정 추가"
          filterInfo={filterInfo}
          selected={select === 'schedule'}
          onClick={() => setSelect('schedule')}
        >
          <ScheduleInfoBox setFilterInfo={setFilterInfo} />
        </ReservationInfoBox>
        <ReservationInfoBox
          id="location"
          boxName="위치"
          buttonName="위치 추가"
          filterInfo={filterInfo}
          selected={select === 'location'}
          onClick={() => setSelect('location')}
        >
          <LocationInfoBox setFilterInfo={setFilterInfo} />
        </ReservationInfoBox>
        <ReservationInfoBox
          id="evcharge"
          boxName="차량"
          buttonName="차량 정보 추가"
          filterInfo={filterInfo}
          selected={select === 'evcharge'}
          onClick={() => setSelect('evcharge')}
        >
          <VehicleInfoBox />
        </ReservationInfoBox>
        <p>
          "위치" 위도: {filterInfo.location?.lat} 경도:
          {filterInfo.location?.lng}
        </p>
        <p>
          "일정": 시작: {filterInfo.schedule?.entryTime}{' '}
          {filterInfo.schedule?.exitTime}
        </p>
      </section>
      <ButtonWrapper>
        <Button className="w-full py-6 text-xl font-semibold rounded-xl">
          주차장 찾기
        </Button>
      </ButtonWrapper>
    </>
  );
}
