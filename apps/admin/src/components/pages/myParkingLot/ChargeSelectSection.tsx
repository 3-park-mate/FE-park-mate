'use client';

import React from 'react';
import ChargingTypeSelector from './ChargingTypeSelector';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  CommonButton,
  TextBadge,
} from '@repo/ui/components/common/CommonLayouts';
import { Plus } from 'lucide-react';
import { chargingTypes } from '@/data/initialDatas';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';

export default function ChargeSelectSection() {
  const { control } = useFormContext<AddParkingLotStoreDataType>();
  const { fields, append } = useFieldArray({
    control,
    name: 'parkingSpot.chargeable',
  });

  return (
    <section className="space-y-5">
      <div className="flex justify-center gap-3">
        {chargingTypes.map(({ icon: Icon, label }, index) => (
          <div key={index} className="flex flex-col items-center">
            <Icon size={45} />
            <TextBadge>{label}</TextBadge>
          </div>
        ))}
      </div>
      {fields.map((_, index) => (
        <ChargingTypeSelector key={index} index={index} />
      ))}
      <CommonButton
        type="button"
        className="bg-white text-gray-2 border"
        onClick={() => {
          append({
            parkingSpotType: 'EV',
            evChargeTypes: [],
          });
        }}
      >
        <Plus className="w-4 h-4 shrink-0" />
        <span>주차면 추가하기</span>
      </CommonButton>
      <hr />
      <p className="text-right px-3">
        <span className="text-gray-2 text-sm">전체 전기차 충전 주차면수</span>
        <span className="font-bold text-3xl text-secondary ms-2">
          {fields.length}
        </span>
      </p>
    </section>
  );
}
