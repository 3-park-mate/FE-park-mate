'use client';
import React, { useEffect, useState } from 'react';
import { ReservationInfoBox } from './ReservationInfoBox';
import { Input } from '@repo/ui/components/base/input';

export default function VehicleInfoBox({ select }: { select: string }) {
  return select !== 'selectVehicle' ? (
    <>
      <ReservationInfoBox boxName="차량" buttonName="차량 정보 추가" />
    </>
  ) : (
    <div className="rounded-sm p-6 bg-white/60 shadow-md">
      <h2 className="text-2xl font-semibold">차량</h2>
    </div>
  );
}
