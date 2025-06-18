'use client';
import ChargingTypeSelector from './ChargingTypeSelector';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  CommonButton,
  TotalSpotCount,
} from '@repo/ui/components/common/CommonLayouts';
import { Plus } from 'lucide-react';
import { AddParkingLotDataType } from '@/types/addParkingLotDataTypes';

export default function EvSpotSetupSection() {
  const { control } = useFormContext<AddParkingLotDataType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parkingSpot.chargeable',
  });

  return (
    <section className="space-y-5">
      {fields.map((_, index) => (
        <ChargingTypeSelector
          key={_.id}
          index={index}
          onRemove={() => remove(index)}
        />
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
      <TotalSpotCount count={fields.length} label="전체 전기차 충전 주차면수" />
    </section>
  );
}
