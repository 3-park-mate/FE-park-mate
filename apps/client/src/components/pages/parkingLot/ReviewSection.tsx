import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import ReviewItem from './ReviewItem';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';
import { getReviewsData } from '@/actions/review/review-service';

export default async function ReviewSection({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const res = await getReviewsData({ size: 3, parkingLotUuid });
  if (!res.success) return;

  const reviewsPreviewData = res.data.content;

  return (
    <PaddedSection className="bg-white py-7" id="reviews">
      <h2 className="text-lg font-semibold">
        방문자 리뷰 <span className="text-gray-3 text-base">349</span>
      </h2>
      <section className="py-2">
        {reviewsPreviewData.map((review, index) => (
          <div key={index}>
            <ReviewItem review={review} />
            {index !== reviewsPreviewData.length - 1 && <hr className="my-2" />}
          </div>
        ))}
        <Link
          href={`/reviews/${parkingLotUuid}`}
          className={`${buttonVariants({ variant: 'default' })} w-full h-10 bg-white !text-black mt-4`}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          리뷰 전체보기 <ChevronRight />
        </Link>
      </section>
    </PaddedSection>
  );
}
