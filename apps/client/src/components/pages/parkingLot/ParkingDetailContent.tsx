import { parkingDetailDummy } from '@/data/parkingDummyDatas';
import DetailExtraInfoSection from './DetailExtraInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';
import { HomeTabMenu } from '../home/HomeTabMenu';

export default function ParkingDetailContent() {
  return (
    <section className="bg-inner-background-gray">
      <section className="space-y-3">
        <DetailExtraInfoSection
          mainAddress={parkingDetailDummy.mainAddress}
          evChargingAvailable={parkingDetailDummy.evChargingAvailable}
          extraInfo={parkingDetailDummy.extraInfo}
        />
        {parkingDetailDummy.imageUrls[0] && (
          <ImageCarouselSection imageUrls={parkingDetailDummy.imageUrls} />
        )}
      </section>
      <section>
        <ul className="flex justify-between bg-inner-background-gray">
          <HomeTabMenu tabMenuName="주차장 정보" selected={true} />
          <HomeTabMenu tabMenuName="리뷰 (349)" />
        </ul>
        <ReviewSection />
      </section>
    </section>
  );
}
