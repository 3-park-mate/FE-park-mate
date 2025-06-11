'use client';

import React, { useState } from 'react';
import ChargingTypeSelector from './ChargingTypeSelector';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  CommonButton,
  TextBadge,
} from '@repo/ui/components/common/CommonLayouts';
import { Plus } from 'lucide-react';
import { chargingTypes } from '@/data/initialDatas';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';
import AlertModal from '@repo/ui/components/common/AlertModal'; // 경로는 실제 위치에 맞게 조정하세요

export default function ChargeSelectSection() {
  const { control } = useFormContext<AddParkingLotStoreDataType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parkingSpot.chargeable',
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [removeTargetIndex, setRemoveTargetIndex] = useState<number | null>(
    null
  );

  const handleRemoveClick = (index: number) => {
    setRemoveTargetIndex(index);
    setOpenAlert(true);
  };

  const handleConfirmRemove = () => {
    if (removeTargetIndex !== null) {
      remove(removeTargetIndex);
      setRemoveTargetIndex(null);
    }
    setOpenAlert(false);
  };

  return (
    <>
      <AlertModal
        open={openAlert}
        onOpenChange={setOpenAlert}
        onConfirm={handleConfirmRemove}
        errorMessage="해당 주차면을 삭제하시겠습니까?"
        showCancelButton
        theme="secondary"
      />
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
          <ChargingTypeSelector
            key={_.id}
            index={index}
            onRemove={() => handleRemoveClick(index)}
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
        <p className="text-right px-3">
          <span className="text-gray-2 text-sm">전체 전기차 충전 주차면수</span>
          <span className="font-bold text-3xl text-secondary ms-2">
            {fields.length}
          </span>
        </p>
      </section>
    </>
  );
}
