import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../base/button';

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
}: React.ComponentProps<'button'> &
  Readonly<{ children: React.ReactNode; className?: string }>) {
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
      <Icon className="w-4 h-4 shrink-0 mt-[3px]" />
      <span>{children}</span>
    </div>
  );
}

export function HeaderLayout({
  children,
  isShadow,
  className,
}: {
  children: React.ReactNode;
  isShadow?: boolean;
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
      <div className="h-14" />
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
}: {
  Icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  IconClassName?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2 items-center', className)}>
      <Icon className={(cn('w-6 h-6'), IconClassName)} />
      <p className="text-xs xs:text-sm">{children}</p>
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
