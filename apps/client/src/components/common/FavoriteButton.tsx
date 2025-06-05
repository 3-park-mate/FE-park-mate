import { cn } from '@repo/ui/lib/utils';
import { Star } from 'lucide-react';

export default function FavoriteButton({
  className,
  ...buttonProps
}: { className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="cursor-pointer" {...buttonProps}>
      <Star
        fill="currentColor"
        className={cn(`absolute top-2 right-2 text-yellow-3`, className)}
      />
    </button>
  );
}
