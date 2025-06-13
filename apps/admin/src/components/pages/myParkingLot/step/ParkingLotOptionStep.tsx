import {
  HeadingWithDesc,
  ParkingLotOptionGrid,
} from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '../StepButtons';
import ParkingLotOptionItem from '../ParkingLotOptionItem';
import { getParkingLotOptions } from '@/actions/parking/parking-service';
import { ParkingLotOptionDataType } from '@/types/parkingDataTypes';
import { useFetchData } from '@/hooks/useFetchData';

export default function ParkingLotOptionStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { data: options, loading } =
    useFetchData<ParkingLotOptionDataType[]>(getParkingLotOptions);

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
              isSelected={index === 1}
            />
          ))}
        </ParkingLotOptionGrid>
      )}

      <StepButtons onBack={onBack} onNext={onNext} />
    </section>
  );
}
