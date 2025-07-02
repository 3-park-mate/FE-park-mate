import {
  PaddedSection,
  Rating,
} from '@repo/ui/components/common/CommonLayouts';

export default function ReviewListHeader() {
  return (
    <PaddedSection className="flex justify-between items-center py-5">
      <h2 className="text-lg font-semibold flex-shrink-0">
        전체 리뷰<span className="ps-1 text-gray-3 text-base">349</span>
      </h2>
      <Rating className="!text-15px !pt-0">5.0</Rating>
      {/* <OptionsDropdown
              paramKey="sort"
              options={[
                { label: '최신순', value: 'latest' },
                { label: '별점 높은순', value: 'high-rate' },
                { label: '별점 낮은순', value: 'low-rate' },
              ]}
            /> */}
    </PaddedSection>
  );
}
