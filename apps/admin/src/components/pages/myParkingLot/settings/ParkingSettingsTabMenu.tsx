import { cn } from '@repo/ui/lib/utils';

export function ParkingSettingsTabMenu({
  tabMenuName = '',
  selected,
  onClick,
}: {
  tabMenuName: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <li onClick={onClick} className="w-full flex text-center py-1.5">
      <span
        className={cn(
          'py-1.5 w-full rounded-2xl text-sm text-gray-2',
          selected &&
            'bg-white transition-all duration-100 text-black font-semibold'
        )}
      >
        {tabMenuName}
      </span>
    </li>
  );
}
