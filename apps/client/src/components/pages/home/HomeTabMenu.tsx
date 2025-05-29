import { HomeTabType } from '@/types/homeTabType';
import { cn } from '@repo/ui/lib/utils';

export function HomeTabMenu({
  tabMenuName = '',
  selected,
  onClick,
}: HomeTabType) {
  return (
    <li onClick={onClick} className="w-full text-center py-4">
      <span
        className={cn(
          'py-4 text-[0.813rem] text-gray-2',
          selected &&
            'border-b-4 transition-all duration-100 border-primary-dark-50 text-black font-semibold'
        )}
      >
        {tabMenuName}
      </span>
    </li>
  );
}
