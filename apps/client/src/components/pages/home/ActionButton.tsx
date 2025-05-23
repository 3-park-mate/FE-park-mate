import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

export default function ActionButton({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href="/"
      className={cn(
        'relative w-full h-44 text-left rounded-[20px]',
        'text-white p-6 flex flex-col',
        className
      )}
    >
      <h2 className="text-[20px] font-semibold pb-2">{title}</h2>
      {children}
    </Link>
  );
}
