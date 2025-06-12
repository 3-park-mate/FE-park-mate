import { chargingTypes } from '@/data/initialDatas';
import { TextBadge } from '@repo/ui/components/common/CommonLayouts';

export default function ChargingTypeGuide() {
  return (
    <div className="flex justify-center gap-3">
      {chargingTypes.map(({ icon: Icon, label }, index) => (
        <div key={index} className="flex flex-col items-center">
          <Icon size={45} />
          <TextBadge>{label}</TextBadge>
        </div>
      ))}
    </div>
  );
}
