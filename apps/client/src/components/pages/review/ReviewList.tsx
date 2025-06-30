import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import ReviewItem from './ReviewItem';
import { mockReviews } from '@/data/reviewDummyDatas';
import OptionsDropdown from '@/components/common/OptionsDropdown';

export default function ReviewList() {
  return (
    <div className="max-w-2xl mx-auto">
      <PaddedSection className="flex justify-between py-5">
        <h2 className="text-lg font-semibold flex-shrink-0">
          방문자 리뷰<span className="ps-1 text-gray-3 text-base">349</span>
        </h2>
        <OptionsDropdown
          paramKey="sort"
          options={[
            { label: '최신순', value: 'latest' },
            { label: '별점 높은순', value: 'high-rate' },
            { label: '별점 낮은순', value: 'low-rate' },
          ]}
        />
      </PaddedSection>

      <section className="space-y-3">
        {mockReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </section>
    </div>
  );
}
