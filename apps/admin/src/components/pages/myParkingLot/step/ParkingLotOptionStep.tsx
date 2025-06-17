import {
  HeadingWithDesc,
  ParkingLotOptionGrid,
} from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
import ParkingLotOptionItem from '../ParkingLotOptionItem';
import { getParkingLotOptions } from '@/actions/parking/parking-service';
import { ParkingLotOptionDataType } from '@/types/parkingDataTypes';
import { useFetchData } from '@/hooks/useFetchData';
import { useFormContext, useWatch } from 'react-hook-form';
import { AddParkingLotDataType } from '@/types/addParkingLotDataTypes';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useState } from 'react';

export default function ParkingLotOptionStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { data: options } =
    useFetchData<ParkingLotOptionDataType[]>(getParkingLotOptions);
  const { control, setValue } = useFormContext<AddParkingLotDataType>();
  const optionIds = useWatch({ control, name: 'optionIds' }) || [];

  const [openAlert, setOpenAlert] = useState(false);
  const handleToggle = (id: number) => {
    const updated = optionIds.includes(id)
      ? optionIds.filter((optId) => optId !== id)
      : [...optionIds, id];
    setValue('optionIds', updated, { shouldDirty: true, shouldValidate: true });
  };

  const handleNextClick = () => {
    if (optionIds.length === 0) {
      setOpenAlert(true);
      return;
    }
    onNext();
  };

  const handleConfirm = () => {
    setOpenAlert(false);
    onNext();
  };

  return (
    <section className="space-y-5">
      <AlertModal
        open={openAlert}
        onOpenChange={setOpenAlert}
        onConfirm={handleConfirm}
        errorMessage="주차장 옵션이 선택되지 않았습니다. 다음으로 이동하시겠습니까?"
        theme="secondary"
        showCancelButton
      />
      <HeadingWithDesc
        heading="주차장 옵션을 선택해 주세요."
        subHeading="하단 옵션들 중 주차장이 제공하는 기능들을 전부 체크해 주세요."
      />
      {options ? (
        <ParkingLotOptionGrid>
          {options.map((option) => (
            <ParkingLotOptionItem
              key={option.id}
              option={option}
              isSelected={optionIds.includes(option.id)}
              onClick={() => handleToggle(option.id)}
            />
          ))}
        </ParkingLotOptionGrid>
      ) : (
        <section className="border rounded-xl px-6 py-10 relative">
          <DotSpinner className="mx-auto" />
        </section>
      )}
      <StepButtons onBack={onBack} onNext={handleNextClick} />
    </section>
  );
}
