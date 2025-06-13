import { CommonCheckbox } from '@repo/ui/components/common/CommonCheckbox';
import {
  OptionContainer,
  OptionIconWithText,
} from '@repo/ui/components/common/CommonLayouts';
import EVChargingIcon from '@repo/ui/components/icon/options/EVChargingIcon';
import { cn } from '@repo/ui/lib/utils';

export default function ParkingLotOptionItem({
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick?: () => void;
}) {
  return (
    <OptionContainer
      isSelected={isSelected}
      onClick={onClick}
      className="flex-col items-center gap-2 p-2"
    >
      <OptionIconWithText
        Icon={EVChargingIcon}
        className={cn(
          'rounded-xl justify-center text-center',
          isSelected ? 'text-black' : 'text-gray-2'
        )}
        IconClassName={cn(isSelected ? 'text-black' : 'text-gray-3')}
      >
        전기차충전
      </OptionIconWithText>
      <CommonCheckbox checked={isSelected} />
    </OptionContainer>
  );
}
