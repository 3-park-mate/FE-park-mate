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
        'min-h-screen max-w-[600px] mx-auto outline-x outline-1 overflow-hidden',
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
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={cn('px-6', className)}>{children}</section>;
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
        'text-xs bg-primary-dark-50 px-2 py-1 rounded-lg shadow-md',
        className
      )}
    >
      {children}
      <span className="text-[10px] text-black/80">/1시간</span>
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
          'h-13 flex items-center justify-center relative z-40 max-w-[600px] mx-auto',
          'fixed top-0 left-0 right-0 bg-white transition-shadow',
          isShadow && 'shadow-md',
          className
        )}
      >
        {children}
      </header>
      <div className="h-13" />
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
