import { cn } from '@repo/ui/lib/utils';

export default function ActiveIconWithBadge({
  Icon,
  label,
  isActive,
  iconSize = 28,
}: {
  Icon: React.ElementType;
  label: string;
  isActive: boolean;
  iconSize?: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <Icon
        size={iconSize}
        className={cn(
          'transition-colors',
          isActive ? 'text-primary-dark-50' : 'text-gray-400'
        )}
      />
      <div className="flex justify-center py-2">
        <p
          className={cn(
            'text-xs inline-flex py-1 px-3 rounded-2xl font-light transition-colors',
            isActive
              ? 'bg-white border border-primary text-primary font-medium'
              : 'bg-gray-200 text-gray-400'
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
