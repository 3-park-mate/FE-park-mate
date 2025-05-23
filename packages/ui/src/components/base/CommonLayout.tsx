import { cn } from '../../lib/utils';

export function GlobalContainerView({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={cn('min-h-screen max-w-[600px] mx-auto', className)}>
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
