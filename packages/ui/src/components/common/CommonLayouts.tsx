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
  return <div className={cn('px-5', className)}>{children}</div>;
}

export function CommonButton({
  children,
  className,
  ...props
}: React.ComponentProps<'button'> &
  Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <Button className={cn('w-full h-10 rounded-2xl', className)} {...props}>
      {children}
    </Button>
  );
}
