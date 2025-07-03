import VoteButtons from '@/components/common/VoteButtons';
import { MAX_REVIEW_CONTENT_LENGTH } from '@/constants/constants';
import { ReviewItemDataType } from '@/types/reviewDataTypes';
import { Rating } from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';

export default function ReviewItem({ review }: { review: ReviewItemDataType }) {
  const displayedContent =
    review.content.length > MAX_REVIEW_CONTENT_LENGTH
      ? `${review.content.substring(0, MAX_REVIEW_CONTENT_LENGTH)}...`
      : review.content;
  return (
    <div className="py-3">
      <p>{review.name}</p>
      <Rating className="!text-sm">
        <span className="">{review.rating.toFixed(1)}</span>
        {/* <span className="text-gray-3 text-sm ms-1">23.4.21</span> */}
      </Rating>
      <div className="flex justify-between">
        <p className="text-15px text-gray-2 pt-2">{displayedContent}</p>
        {review.imageUrls[0] && (
          <div className="relative rounded-md w-24 h-24 ml-3 flex-shrink-0">
            <Image
              src={review.imageUrls[0]}
              alt="리뷰 이미지"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <VoteButtons
        upCount={review.likeCount}
        downCount={review.dislikeCount}
        className="mt-2.5"
      />
    </div>
  );
}
