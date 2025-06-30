import {
  ParkingLotOption,
  ParkingLotOptionDataType,
} from '@/types/parkingDataTypes';
import { parkingLotOptionIconMap } from '@/data/initialDatas';
import { OptionIconWithText } from '@repo/ui/components/common/CommonLayouts';
import { getParkingLotOptions } from '@/actions/parking/parking-service';

export default async function ParkingLotOptionSection({
  options,
}: {
  options: ParkingLotOption[];
}) {
  const { data: allParkingLotOptions } = (await getParkingLotOptions()) as {
    success: true;
    data: ParkingLotOptionDataType[];
  };

  const enabledOptionLabels = new Set(options.map((opt) => opt.label));

  return (
    <>
      <h2 className="text-lg font-semibold pb-5">주차장 옵션</h2>
      <div className="grid grid-cols-5 gap-x-2 gap-y-8 p-1 py-4">
        {allParkingLotOptions.map((fullOption) => {
          const Icon = parkingLotOptionIconMap[fullOption.label];
          if (!Icon) return null;

          const isActive = enabledOptionLabels.has(fullOption.label);

          return (
            <OptionIconWithText
              key={fullOption.label}
              Icon={Icon}
              isActive={isActive}
            >
              {fullOption.name}
            </OptionIconWithText>
          );
        })}
      </div>
    </>
  );
}
