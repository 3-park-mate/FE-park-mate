import { ParkingLotOption } from '@/types/parkingDataTypes';
import { parkingLotOptionIconMap } from '@/data/initialDatas';
import { OptionIconWithText } from '@repo/ui/components/common/CommonLayouts';

export default function ParkingLotOptionSection({
  options,
}: {
  options: ParkingLotOption[];
}) {
  const enabledOptionLabels = new Set(options.map((opt) => opt.label));

  return (
    <>
      <h2 className="text-lg font-semibold pb-5">주차장 옵션</h2>
      <div className="grid grid-cols-5 gap-x-2 gap-y-8 p-1 py-4">
        {Object.entries(parkingLotOptionIconMap).map(([label, Icon]) => {
          const option = options.find((opt) => opt.label === label);
          const isActive = enabledOptionLabels.has(label);
          return (
            <OptionIconWithText key={label} Icon={Icon} isActive={isActive}>
              {option?.name}
            </OptionIconWithText>
          );
        })}
      </div>
    </>
  );
}
