import {
  HeadingWithDesc,
  ParkingLotOptionGrid,
} from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '../StepButtons';
import ParkingLotOptionItem from '../ParkingLotOptionItem';
import { getParkingLotOptions } from '@/actions/parking/parking-service';
import { ParkingLotOptionDataType } from '@/types/parkingDataTypes';
import { useFetchData } from '@/hooks/useFetchData';
import { useFormContext, useWatch } from 'react-hook-form';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';

export default function ParkingLotOptionStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { data: options, loading } =
    useFetchData<ParkingLotOptionDataType[]>(getParkingLotOptions);
  const { control, setValue } = useFormContext<AddParkingLotStoreDataType>();
  const optionIds = useWatch({ control, name: 'optionIds' }) || [];

  const handleToggle = (id: number) => {
    const updated = optionIds.includes(id)
      ? optionIds.filter((optId) => optId !== id)
      : [...optionIds, id];
    setValue('optionIds', updated, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="주차장 옵션을 선택해 주세요."
        subHeading="하단 옵션들 중 주차장이 제공하는 기능들을 전부 체크해 주세요."
      />
      {options && (
        <ParkingLotOptionGrid>
          {options.map((option, index) => (
            <ParkingLotOptionItem
              key={option.id}
              option={option}
              isSelected={optionIds.includes(option.id)}
              onClick={() => handleToggle(option.id)}
            />
          ))}
        </ParkingLotOptionGrid>
      )}

      <StepButtons onBack={onBack} onNext={onNext} />
    </section>
  );
}
