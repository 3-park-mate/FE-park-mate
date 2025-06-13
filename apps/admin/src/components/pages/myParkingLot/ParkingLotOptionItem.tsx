import { Checkbox } from '@repo/ui/components/base/checkbox';
import { OptionIconWithText } from '@repo/ui/components/common/CommonLayouts';
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
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-2 rounded-2xl border transition-colors duration-200 cursor-pointer aspect-square',
        isSelected
          ? 'bg-secondary/10 border-secondary'
          : 'bg-white border-gray-200 dark:bg-gray-800'
      )}
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
      <Checkbox
        checked={isSelected}
        className={cn(
          'w-4 h-4 rounded cursor-pointer border transition-all duration-200 text-white pointer-events-none',
          'data-[state=checked]:bg-secondary data-[state=checked]:border-secondary',
          'data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300'
        )}
      />
    </div>
  );
}
