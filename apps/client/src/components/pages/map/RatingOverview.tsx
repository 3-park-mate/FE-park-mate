import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function RatingOverview({
  averageRating,
  reviewCount,
  likeCount,
  dislikeCount,
}: {
  averageRating: number;
  reviewCount: number;
  likeCount: number;
  dislikeCount: number;
}) {
  return (
    <div className="flex space-x-3 text-13px">
      <p className="flex items-center gap-1">
        <Star fill="currentColor" className="text-yellow-2" size={14} />
        {averageRating}
        {reviewCount < 999 ? `(${reviewCount})` : `(999+)`}
      </p>
      <p className="flex items-center gap-1">
        <ThumbsUp fill="currentColor" className="text-gray-2" size={14} />
        {likeCount < 999 ? likeCount : `999+`}
      </p>
      <p className="flex items-center gap-1">
        <ThumbsDown fill="currentColor" className="text-gray-2" size={14} />
        {dislikeCount < 999 ? dislikeCount : `999+`}
      </p>
    </div>
  );
}
