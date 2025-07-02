'use client';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import ReviewItem from './ReviewItem';
import { mockReviews } from '@/data/reviewDummyDatas';
import OptionsDropdown from '@/components/common/OptionsDropdown';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ReviewItemDataType } from '@/types/reviewDataTypes';
import { getReviewsData } from '@/actions/review/review-service';
import { PAGE_SIZE } from '@/constants/constants';
import ReviewItemSkeleton from './ReviewItemSkeleton';

export default function ReviewList({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const {
    items: reviews,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<ReviewItemDataType, string>({
    fetchData: async (cursor) => {
      const res = await getReviewsData({
        size: PAGE_SIZE,
        cursor,
        parkingLotUuid,
      });
      if (res.success) {
        return {
          content: res.data.content,
          cursor: res.data.cursor,
          hasNext: res.data.hasNext,
        };
      }
      throw new Error('Failed to fetch');
    },
    filterDuplicateItems: (existing, newItems) => {
      const existingCodes = new Set(existing.map((item) => item.reviewUuid));
      return newItems.filter((item) => !existingCodes.has(item.reviewUuid));
    },
  });

  if (isLoading && reviews.length === 0) {
    return (
      <section className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <ReviewItemSkeleton key={index} />
        ))}
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {reviews.map((review) => (
        <ReviewItem key={review.reviewUuid} review={review} />
      ))}

      <div ref={loaderRef} className="pb-4 h-10">
        {isLoading && <ReviewItemSkeleton />}
      </div>
      {reviews.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500">등록된 리뷰가 없습니다.</p>
      )}
    </section>
  );
}
