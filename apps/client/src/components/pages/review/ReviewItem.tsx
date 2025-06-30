'use client';
import ImageCarouselWithDots from '@/components/common/ImageCarouselWithDots';
import VoteButtons from '@/components/common/VoteButtons';
import { Review } from '@/types/reviewDataTypes';
import { PaddedLayout, Rating } from '@repo/ui/components/common/CommonLayouts';
import { useState } from 'react';

const MAX_CONTENT_LENGTH = 150;

export default function ReviewItem({ review }: { review: Review }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const isContentTooLong = review.content.length > MAX_CONTENT_LENGTH;
  const displayedContent =
    showFullContent || !isContentTooLong
      ? review.content
      : `${review.content.substring(0, MAX_CONTENT_LENGTH)}...`;

  const toggleShowFullContent = () => {
    setShowFullContent((prev) => !prev);
  };

  return (
    <PaddedLayout className="py-4 bg-white rounded-lg">
      <h2>{review.userName}</h2>
      <Rating className="pb-3 !text-sm">{review.rating}</Rating>

      {review.images.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto mb-3">
          <ImageCarouselWithDots images={review.images} showDots={false} />
        </div>
      )}
      <p className="text-15px text-gray-700 whitespace-pre-line">
        {displayedContent}
      </p>
      {isContentTooLong && (
        <button
          className="text-gray-400 text-sm pt-1 cursor-pointer"
          onClick={toggleShowFullContent}
        >
          {showFullContent ? '간략히' : '더보기'}
        </button>
      )}

      <div className="flex items-center justify-between pt-5">
        <VoteButtons upCount={review.likes} downCount={review.dislikes} />
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{review.date}</span>
        </div>
      </div>
    </PaddedLayout>
  );
}
