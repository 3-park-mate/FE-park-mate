'use client';

import React, { useState } from 'react';
import ScheduleInfoBox from './ScheduleInfoBox';
import LocationInfoBox from './LocationInfoBox';
import VehicleInfoBox from './VehicleInfoBox';

export default function ReservationInfoSection() {
  const [select, setSelect] = useState('');
  return (
    <section className="space-y-4 pt-5">
      <div onClick={() => setSelect('selectSchedule')} className="w-full">
        <ScheduleInfoBox select={select} />
      </div>
      <div onClick={() => setSelect('selectLocation')} className="w-full">
        <LocationInfoBox select={select} />
      </div>
      <div onClick={() => setSelect('selectVehicle')} className="w-full">
        <VehicleInfoBox select={select} />
      </div>
    </section>
  );
}
