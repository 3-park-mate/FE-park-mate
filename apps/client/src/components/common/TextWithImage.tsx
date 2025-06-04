import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

export function TextWithImage({
  children,
  imageProps,
  className,
}: {
  children: React.ReactNode;
  imageProps: { src: string; alt: string; width?: number; height?: number };
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-1.5 text-sm py-2', className)}>
      <Image width={30} height={30} {...imageProps} className="rounded-full" />
      <span>{children}</span>
    </div>
  );
}
