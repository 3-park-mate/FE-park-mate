import { parkingLotOptionIconMap } from '@/data/initialDatas';
import { chargingTypes, ParkingLotOption } from '@/types/parkingDataTypes';
import {
  OptionIconWithText,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import { cn } from '@repo/ui/lib/utils';

export default function OptionSection({
  options,
  evChargeTypes,
}: {
  options: ParkingLotOption[];
  evChargeTypes: string[];
}) {
  const enabledOptionLabels = new Set(options.map((opt) => opt.label));
  const enabledChargeTypes = new Set(evChargeTypes);

  return (
    <PaddedSection className="bg-white py-7 mb-3" id="options">
      <h2 className="text-lg font-semibold pb-5">주차장 옵션</h2>
      <div className="grid grid-cols-5 gap-x-3 gap-y-8 p-1 py-4">
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

      {evChargeTypes && (
        <>
          <hr className="my-6" />
          <h3 className="text-base font-semibold pb-4">전기차 충전 타입</h3>
          <div className="grid grid-cols-4 xs:grid-cols-5 gap-y-8 p-1 py-3">
            {chargingTypes.map(({ key, icon: Icon, label }) => {
              const isActive = enabledChargeTypes.has(key);
              return (
                <div key={key} className="flex flex-col items-center">
                  <Icon
                    size={28}
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-primary-dark-50' : 'text-gray-400'
                    )}
                  />

                  <div className="flex justify-center py-2">
                    <p
                      className={cn(
                        'text-xs inline-flex py-1 px-3 rounded-2xl font-light transition-colors',
                        isActive
                          ? 'bg-white border border-primary text-primary font-medium'
                          : 'bg-gray-200 text-gray-400'
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </PaddedSection>
  );
}
