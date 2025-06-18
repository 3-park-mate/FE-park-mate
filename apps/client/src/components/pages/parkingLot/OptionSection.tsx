import { parkingLotOptionIconMap } from '@/data/initialDatas';
import { ParkingLotOption } from '@/types/parkingDataTypes';
import {
  OptionIconWithText,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';

export default function OptionSection({
  options,
}: {
  options: ParkingLotOption[];
}) {
  const enabledLabels = new Set(options.map((opt) => opt.label));

  return (
    <PaddedSection className="bg-white py-7 mb-3" id="options">
      <h2 className="text-lg font-semibold pb-5">주차장 옵션</h2>
      <div className="grid grid-cols-5 gap-x-3 gap-y-8 p-1 py-4">
        {Object.entries(parkingLotOptionIconMap).map(([label, Icon]) => {
          const option = options.find((opt) => opt.label === label);
          const isEnabled = enabledLabels.has(label);
          return (
            <OptionIconWithText key={label} Icon={Icon} isActive={isEnabled}>
              {option?.name ?? '이름 없음'}
            </OptionIconWithText>
          );
        })}
      </div>
    </PaddedSection>
  );
}
