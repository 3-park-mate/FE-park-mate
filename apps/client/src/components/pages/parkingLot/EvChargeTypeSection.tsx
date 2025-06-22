import { EVChargeType } from '@/types/parkingDataTypes';
import { chargingTypes } from '@/data/initialDatas';
import ActiveIconWithBadge from '@/components/common/ActiveIconWithBadge';

export default function EvChargeTypeSection({
  evChargeTypes,
}: {
  evChargeTypes: EVChargeType[];
}) {
  const enabledChargeTypes = new Set(evChargeTypes);

  return (
    <>
      <h3 className="text-base font-semibold pb-4">전기차 충전 타입</h3>
      <div className="grid grid-cols-4 xs:grid-cols-5 gap-y-8 p-1 py-3">
        {chargingTypes.map(({ key, icon: Icon, label }) => {
          const isActive = enabledChargeTypes.has(key as EVChargeType);
          return (
            <ActiveIconWithBadge
              key={key}
              Icon={Icon}
              label={label}
              isActive={isActive}
            />
          );
        })}
      </div>
    </>
  );
}
