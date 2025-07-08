import HeadingWithSubtext from './HeadingWithSubtext';
import Evchargetypebadges from '../pages/map/EvChargeTypeBadges';
import RatingOverview from '../pages/map/RatingOverview';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { ReviewSummaryDataType } from '@/types/reviewDataTypes';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';

export default function ParkingLotSimpleInfoCard({
  showEvBadge = false,
  imageAlign = 'right',
  parkingLotData,
  reviewSummaryData,
  className,
}: {
  showEvBadge?: boolean;
  imageAlign?: 'right' | 'left';
  parkingLotData: ParkingLotResponseDataType;
  reviewSummaryData?: ReviewSummaryDataType;
  className?: string;
}) {
  return (
    <>
      <div className={cn('flex items-center gap-5', className)}>
        {imageAlign === 'left' && (
          <Image
            src={parkingLotData.thumbnailUrl || `/img/no-image.png`}
            alt={parkingLotData.name}
            width={90}
            height={90}
            className="rounded-lg aspect-square object-cover"
          />
        )}
        <div className="flex flex-col space-y-1">
          <HeadingWithSubtext
            heading={parkingLotData?.name || ''}
            className="leading-7"
            tight
          >
            {parkingLotData?.address}
          </HeadingWithSubtext>
          {showEvBadge && <Evchargetypebadges />}
          {reviewSummaryData && (
            <RatingOverview
              reviewSummaryData={reviewSummaryData}
              likeCount={parkingLotData?.likeCount}
              dislikeCount={parkingLotData?.dislikeCount}
            />
          )}
        </div>
        {imageAlign === 'right' && (
          <Image
            src={parkingLotData.thumbnailUrl || `/img/no-image.png`}
            alt={parkingLotData.name}
            width={90}
            height={90}
            className="rounded-lg ml-1 aspect-square object-cover"
          />
        )}
      </div>
    </>
  );
}
