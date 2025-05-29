import { cn } from '../../lib/utils';
import { Button } from '../base/button';

export function GlobalContainerView({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={cn(
        'min-h-screen max-w-[600px] mx-auto border-x overflow-hidden',
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
