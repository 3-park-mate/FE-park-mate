import ImageCarouselWithDots from '@/components/common/ImageCarouselWithDots';
import { Review } from '@/types/reviewDataTypes';
import { PaddedLayout, Rating } from '@repo/ui/components/common/CommonLayouts';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <PaddedLayout className="py-4 bg-white rounded-lg">
      <h2>{review.userName}</h2>
      <Rating className="pb-3 !text-sm">{review.rating}</Rating>

      {review.images.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto mb-3">
          {/* {review.images.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={image || '/placeholder.svg'}
                alt={`리뷰 이미지 ${index + 1}`}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
            </div>
          ))} */}
          <ImageCarouselWithDots images={review.images} showDots={false} />
        </div>
      )}
      <p className="text-15px text-gray-700 whitespace-pre-line">
        {review.content}
      </p>
      <button className="text-gray-400 text-sm pt-1">더보기</button>

      <div className="flex items-center justify-between pt-5">
        <div className="flex items-center space-x-4">
          <button className="flex gap-1 text-sm text-gray-3 cursor-pointer">
            <ThumbsUp size={16} fill="currentColor" className="text-gray-1" />
            <span>11</span>
          </button>
          <button className="flex gap-1 text-sm text-gray-3 cursor-pointer">
            <ThumbsDown size={16} fill="currentColor" className="text-gray-1" />
            <span>9</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{review.date}</span>
        </div>
      </div>
    </PaddedLayout>
  );
}
