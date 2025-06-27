import { cn } from '@repo/ui/lib/utils';

export default function HeadingWithSubtext({
  heading,
  children,
  className,
  tight = false,
}: {
  heading: string;
  children?: React.ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <div>
      <h2 className={cn('text-18px font-semibold leading-5', className)}>
        {heading}
      </h2>
      {children && (
        <p
          className={cn(
            'text-sm text-gray-2',
            tight && 'leading-[1.2] tracking-tight'
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}
