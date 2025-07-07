import { ReviewSummaryDataType } from '@/types/reviewDataTypes';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function RatingOverview({
  reviewSummaryData,
  likeCount,
  dislikeCount,
}: {
  reviewSummaryData: ReviewSummaryDataType;
  likeCount?: number;
  dislikeCount?: number;
}) {
  const { averageRating, totalReviews } = reviewSummaryData;
  return (
    <div className="flex space-x-2 text-13px">
      {(averageRating !== undefined || totalReviews !== undefined) && (
        <p className="flex items-center gap-0.5">
          <Star fill="currentColor" className="text-yellow-2" size={14} />
          {typeof reviewSummaryData === 'number' && (
            <span>{averageRating}</span>
          )}
          {typeof totalReviews === 'number' && (
            <span>{totalReviews < 999 ? `(${totalReviews})` : `(999+)`}</span>
          )}
        </p>
      )}
      {likeCount !== undefined && (
        <p className="flex items-center gap-0.5">
          <ThumbsUp fill="currentColor" className="text-gray-2" size={14} />
          {likeCount < 999 ? likeCount : `999+`}
        </p>
      )}
      {dislikeCount !== undefined && (
        <p className="flex items-center gap-0.5">
          <ThumbsDown fill="currentColor" className="text-gray-2" size={14} />
          {dislikeCount < 999 ? dislikeCount : `999+`}
        </p>
      )}
    </div>
  );
}
