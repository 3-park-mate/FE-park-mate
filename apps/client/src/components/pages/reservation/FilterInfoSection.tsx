'use client';

import React, { useState } from 'react';
import ScheduleInfoBox from './ScheduleInfoBox';
import { FilterInfoBox } from './FilterInfoBox';
import { Button } from '@repo/ui/components/base/button';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import VehicleInfoBox from './VehicleInfoBox';
import LocationFilter from './LocationFilter';

export default function FilterInfoSection() {
  const [select, setSelect] = useState<'schedule' | 'location' | 'evcharge'>(
    'schedule'
  );

  return (
    <>
      <section className="space-y-4 pt-5 mx-4">
        <FilterInfoBox
          id="schedule"
          boxName="일정"
          buttonName="일정 추가"
          selected={select === 'schedule'}
          onClick={() => setSelect('schedule')}
        >
          <ScheduleInfoBox />
        </FilterInfoBox>
        <FilterInfoBox
          id="location"
          boxName="위치"
          buttonName="위치 추가"
          selected={select === 'location'}
          onClick={() => setSelect('location')}
        >
          <LocationFilter />
        </FilterInfoBox>
        <FilterInfoBox
          id="evcharge"
          boxName="차량"
          buttonName="차량 정보 추가"
          selected={select === 'evcharge'}
          onClick={() => setSelect('evcharge')}
        >
          <VehicleInfoBox />
        </FilterInfoBox>
      </section>
      <ButtonWrapper>
        <Button className="w-full py-6 text-xl font-semibold rounded-xl">
          주차장 찾기
        </Button>
      </ButtonWrapper>
    </>
  );
}
