import { cn } from '@repo/ui/lib/utils';

export default function MenuIconListItem({
  Icon,
  children,
  className,
  ...buttonProps
}: {
  Icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <li>
      <button
        className={cn(
          'flex flex-col items-center gap-1 cursor-pointer',
          className
        )}
        {...buttonProps}
      >
        <Icon fill="currentColor" className="text-gray-1" />
        <span className="text-gray-2 text-sm">{children}</span>
      </button>
    </li>
  );
}
