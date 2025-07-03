import ActiveIconWithBadge from '@/components/common/ActiveIconWithBadge';
import { ParkingSpotType } from '@/types/parkingDataTypes';
import { Car } from 'lucide-react';

const parkingSpotTypeIconMap: Record<ParkingSpotType, React.ElementType> = {
  SMALL: Car,
  COMPACT: Car,
  STANDARD: Car,
  LARGE: Car,
};

const parkingSpotTypeLabelMap: Record<ParkingSpotType, string> = {
  SMALL: '경차',
  COMPACT: '소형차',
  STANDARD: '중형차',
  LARGE: '대형차',
};

export default function ParkingSpotTypeSection({
  parkingSpotTypes,
}: {
  parkingSpotTypes: ParkingSpotType[];
}) {
  const enabledTypes = new Set(parkingSpotTypes);

  return (
    <>
      <h3 className="text-base font-semibold pb-4">수용 가능 차량 크기</h3>
      <div className="grid grid-cols-4 xs:grid-cols-5 gap-y-8 p-1 py-3">
        {Object.entries(parkingSpotTypeIconMap).map(([key, Icon]) => {
          const isActive = enabledTypes.has(key as ParkingSpotType);
          return (
            <ActiveIconWithBadge
              key={key}
              Icon={Icon}
              label={parkingSpotTypeLabelMap[key as ParkingSpotType]}
              isActive={isActive}
            />
          );
        })}
      </div>
    </>
  );
}
