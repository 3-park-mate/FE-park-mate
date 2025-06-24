import { parkingLotOptionIconMap } from '@/data/initialDatas';
import { ParkingLotOptionDataType } from '@/types/parkingDataTypes';
import { CommonCheckbox } from '@repo/ui/components/common/CommonCheckbox';
import {
  OptionContainer,
  OptionIconWithText,
} from '@repo/ui/components/common/CommonLayouts';
import { cn } from '@repo/ui/lib/utils';

export default function ParkingLotOptionItem({
  option,
  isSelected,
  onClick,
}: {
  option: ParkingLotOptionDataType;
  isSelected: boolean;
  onClick?: () => void;
}) {
  const Icon = parkingLotOptionIconMap[option.label];

  return (
    <OptionContainer
      isSelected={isSelected}
      className="flex-col items-center gap-2 p-2"
    >
      <OptionIconWithText
        Icon={Icon}
        isActive={isSelected}
        className={cn(
          'rounded-xl justify-center text-center transition-all duration-200',
          isSelected ? '!text-black' : '!text-gray-2'
        )}
        IconClassName={cn(isSelected ? 'text-black' : 'text-gray-3')}
      >
        {option.name}
      </OptionIconWithText>
      <CommonCheckbox checked={isSelected} onCheckedChange={onClick} />
    </OptionContainer>
  );
}
