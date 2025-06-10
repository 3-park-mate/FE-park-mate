import { parkingDetailDummy } from '@/data/parkingDummyDatas';
import DetailExtraInfoSection from './DetailExtraInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';
import { HomeTabMenu } from '../home/HomeTabMenu';
import OptionSection from './OptionSection';

export default function ParkingDetailContent() {
  return (
    <>
      <ul className="flex justify-between bg-inner-background-gray">
        <HomeTabMenu tabMenuName="정보" />
        <HomeTabMenu tabMenuName="사진" />
        <HomeTabMenu tabMenuName="주차장 옵션" selected={true} />
        <HomeTabMenu tabMenuName="리뷰 (349)" />
      </ul>
      <section className="space-y-3">
        <DetailExtraInfoSection
          mainAddress={parkingDetailDummy.mainAddress}
          evChargingAvailable={parkingDetailDummy.evChargingAvailable}
          extraInfo={parkingDetailDummy.extraInfo}
        />
        {parkingDetailDummy.imageUrls[0] && (
          <ImageCarouselSection imageUrls={parkingDetailDummy.imageUrls} />
        )}
        <OptionSection />
        <ReviewSection />
      </section>
    </>
  );
}
