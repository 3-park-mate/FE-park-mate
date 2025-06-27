import { chargingTypes } from '@/data/initialDatas';

export default function Evchargetypebadges({
  evChargeTypes,
}: {
  evChargeTypes: string[];
}) {
  return (
    <div className="flex gap-1 flex-wrap mt-1">
      {chargingTypes
        .filter((type) => evChargeTypes.includes(type.key))
        .map((type) => (
          <div
            key={type.key}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-light-3 text-xs text-black"
          >
            <type.icon className="w-4 h-4" />
            {type.label}
          </div>
        ))}
    </div>
  );
}
