import { parkingDetailDummy } from '@/data/parkingDummyDatas';
import DetailExtraInfoSection from './DetailExtraInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';

export default function ParkingDetailContent() {
  return (
    <section className="bg-inner-background-gray space-y-3">
      <DetailExtraInfoSection
        mainAddress={parkingDetailDummy.mainAddress}
        evChargingAvailable={parkingDetailDummy.evChargingAvailable}
        extraInfo={parkingDetailDummy.extraInfo}
      />
      {parkingDetailDummy.imageUrls[0] && (
        <ImageCarouselSection imageUrls={parkingDetailDummy.imageUrls} />
      )}
      <ReviewSection />
    </section>
  );
}
