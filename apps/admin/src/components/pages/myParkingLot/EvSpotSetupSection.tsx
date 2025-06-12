'use client';
import { useState } from 'react';
import ChargingTypeSelector from './ChargingTypeSelector';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  CommonButton,
  TotalSpotCount,
} from '@repo/ui/components/common/CommonLayouts';
import { Plus } from 'lucide-react';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';
import AlertModal from '@repo/ui/components/common/AlertModal';

export default function EvSpotSetupSection() {
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
        <TotalSpotCount
          count={fields.length}
          label="전체 전기차 충전 주차면수"
        />
      </section>
    </>
  );
}
