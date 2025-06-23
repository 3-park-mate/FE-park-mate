import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../base/button';
import { ComponentProps } from 'react';

export function GlobalContainerView({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={cn(
        'min-h-screen max-w-[600px] mx-auto outline-x outline-1',
        className
      )}
    >
      {children}
    </div>
  );
}

export function PaddedLayout({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <div className={cn('px-6', className)}>{children}</div>;
}

export function PaddedSection({
  children,
  className,
  ...props
}: Readonly<
  {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLElement>
>) {
  return (
    <section className={cn('px-6', className)} {...props}>
      {children}
    </section>
  );
}

export function CommonButton({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button className={cn('w-full h-11 rounded-2xl', className)} {...props}>
      {children}
    </Button>
  );
}

export function FixedBottomSection({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <section
      className={cn(
        'fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 items-center w-full bg-inner-background-yellow rounded-t-2xl px-5 pt-8 pb-30 max-w-[600px]',
        className
      )}
    >
      {children}
    </section>
  );
}

export function CommonPriceBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-xs bg-primary-dark-50 px-2 py-1 rounded-lg shadow-md font-semibold',
        className
      )}
    >
      {children}
      <span className="text-[10px] text-black/70">/1시간</span>
    </div>
  );
}

export function Rating({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('flex items-center gap-1 text-13px pt-1', className)}>
      <Star fill="currentColor" className="text-[#ffc800]" size={14} />
      {children}
    </p>
  );
}

export function IconWithText({
  Icon,
  children,
  className,
}: {
  Icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-1.5 text-sm', className)}>
      <Icon className="w-4 h-4 shrink-0 mt-[2px]" />
      <span>{children}</span>
    </div>
  );
}

export function HeaderLayout({
  children,
  isShadow,
  withEmptySpace = true,
  className,
}: {
  children: React.ReactNode;
  isShadow?: boolean;
  withEmptySpace?: boolean;
  className?: string;
}) {
  return (
    <>
      <header
        className={cn(
          'h-14 flex items-center justify-center relative z-40 max-w-[600px] mx-auto',
          'fixed top-0 left-0 right-0 bg-white transition-shadow',
          isShadow && 'shadow-md',
          className
        )}
      >
        {children}
      </header>
      {withEmptySpace && <div className="h-14" />}
    </>
  );
}

export function TextBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex justify-center py-5">
      <p
        className={cn(
          'bg-gray-2/60 text-xs text-white inline-flex py-1 px-3 rounded-2xl font-light',
          className
        )}
      >
        {children}
      </p>
    </div>
  );
}

export function CommonBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="">
      <p
        className={cn(
          'bg-gray-2/60 text-xs text-white inline-flex py-1 px-3 rounded-2xl font-light',
          className
        )}
      >
        {children}
      </p>
    </div>
  );
}

export function FormHeading({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn('text-2xl font-semibold pt-10 pb-5', className)}>
      {children}
    </h1>
  );
}

export function HeadingWithDesc({
  heading,
  subHeading,
  className,
}: {
  heading?: string;
  subHeading?: string;
  className?: string;
}) {
  return (
    <div>
      <h1
        className={cn(
          'text-2xl font-semibold pt-10 pb-1 break-keep',
          className
        )}
      >
        {heading}
      </h1>
      <p className="text-gray-dark-1 pb-5 text-15px break-keep">{subHeading}</p>
    </div>
  );
}

export function OptionIconWithText({
  Icon,
  children,
  className,
  IconClassName,
  isActive = false,
}: {
  Icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  IconClassName?: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-center',
        isActive ? 'opacity-100' : 'opacity-40',
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            'w-6 h-6',
            isActive ? 'text-black' : 'text-gray-2',
            IconClassName
          )}
        />
      )}
      <p
        className={cn(
          'text-xs xs:text-sm',
          isActive ? 'text-black font-medium' : 'text-gray-2'
        )}
      >
        {children}
      </p>
    </div>
  );
}

export function TotalSpotCount({
  count,
  label,
  className,
}: {
  count: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn(`text-right px-3`, className)}>
      <span className="text-gray-2 text-sm">{label}</span>
      <span className="font-bold text-3xl text-secondary ms-2">{count}</span>
    </div>
  );
}

export function ParkingLotOptionGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'grid grid-cols-3 xs:grid-cols-5 gap-4 border rounded-xl px-6 py-10 relative',
        className
      )}
    >
      {children}
    </section>
  );
}

export function OptionContainer({
  isSelected,
  onClick,
  className,
  children,
  ...labelProps
}: {
  isSelected: boolean;
  onClick?: React.LabelHTMLAttributes<HTMLLabelElement>['onClick'];
  className?: string;
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      onClick={onClick}
      className={cn(
        'flex items-center justify-between cursor-pointer select-none border px-3 py-2 rounded-2xl transition-colors duration-200',
        isSelected
          ? 'bg-secondary/10 border-secondary'
          : 'bg-white border-gray-200 dark:bg-gray-800',
        className
      )}
      {...labelProps}
    >
      {children}
    </label>
  );
}

export default function InfoRow({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm text-gray-3 ${className}`}>
      {label}
      <span className="text-gray-800 ps-1.5">{children}</span>
    </p>
  );
}
