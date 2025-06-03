import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import AlertBell from '../common/AlertBell';
import { cn } from '@repo/ui/lib/utils';

export default function HomeMainHeader({
  Icon,
  title,
  className,
}: {
  Icon?: React.ElementType;
  title?: string;
  className?: string;
}) {
  return (
    <header className="fixed top-0 w-full max-w-[600px] h-[65px] flex justify-between items-center bg-white p-5 shadow-md space-x-3 z-50">
      <div className="w-full flex items-center gap-2">
        {Icon && <Icon className="size-6" />}
        <p className={cn('text-[0.813rem] font-semibold', className)}>
          {title}
        </p>
      </div>
      <SearchIcon className="size-[24px] flex-none" />
      <AlertBell count={4} />
    </header>
  );
}
