import { cn } from '@repo/ui/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function VoteButtons({
  upCount,
  downCount,
  onUpvote,
  onDownvote,
  className,
}: {
  upCount: number;
  downCount: number;
  onUpvote?: () => void;
  onDownvote?: () => void;
  className?: string;
}) {
  const iconColorClass = 'text-gray-1';
  const textColorClass = 'text-gray-3';

  return (
    <div className={cn(`flex items-center space-x-4`, className)}>
      <button className="flex gap-1 text-sm cursor-pointer" onClick={onUpvote}>
        <ThumbsUp size={16} fill="currentColor" className={iconColorClass} />
        <span className={textColorClass}>{upCount}</span>
      </button>
      <button
        className="flex gap-1 text-sm cursor-pointer"
        onClick={onDownvote}
      >
        <ThumbsDown size={16} fill="currentColor" className={iconColorClass} />
        <span className={textColorClass}>{downCount}</span>
      </button>
    </div>
  );
}
