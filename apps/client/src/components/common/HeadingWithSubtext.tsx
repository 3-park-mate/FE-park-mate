import { cn } from '@repo/ui/lib/utils';

export default function HeadingWithSubtext({
  heading,
  children,
  className,
}: {
  heading: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div>
      <h2 className={cn('text-18px font-semibold leading-5', className)}>
        {heading}
      </h2>
      {children && <p className="text-14px text-gray-2">{children}</p>}
    </div>
  );
}
