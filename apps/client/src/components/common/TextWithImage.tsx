import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

export function TextWithImage({
  children,
  imageProps,
  className,
  right = false,
}: {
  children: React.ReactNode;
  imageProps: { src: string; alt: string; width?: number; height?: number };
  className?: string;
  right?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-sm py-2',
        right && 'flex-row-reverse',
        className
      )}
    >
      <Image width={30} height={30} {...imageProps} className="rounded-full" />
      <span className="font-medium">{children}</span>
    </div>
  );
}
