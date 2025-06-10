import { parkingDetailDummy } from '@/data/parkingDummyDatas';
import DetailExtraInfoSection from './DetailExtraInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';
import OptionSection from './OptionSection';
import ParkingDetailTabBar from './ParkingDetailTabBar';

export default function ParkingDetailContent() {
  return (
    <>
      <ParkingDetailTabBar />
      <section className="space-y-3">
        <DetailExtraInfoSection
          mainAddress={parkingDetailDummy.mainAddress}
          extraInfo={parkingDetailDummy.extraInfo}
        />
        <OptionSection />
        {parkingDetailDummy.imageUrls[0] && (
          <ImageCarouselSection imageUrls={parkingDetailDummy.imageUrls} />
        )}
        <ReviewSection />
      </section>
    </>
  );
}
