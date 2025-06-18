import DetailExtraInfoSection from './DetailExtraInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';
import OptionSection from './OptionSection';
import ParkingDetailTabBar from './ParkingDetailTabBar';
import { ParkingLotOption } from '@/types/parkingDataTypes';

export default function ParkingDetailContent({
  mainAddress,
  extraInfo,
  imageUrls,
  options,
}: {
  mainAddress: string;
  extraInfo: string;
  imageUrls: string[];
  options: ParkingLotOption[];
}) {
  return (
    <>
      <ParkingDetailTabBar />
      <section className="space-y-3">
        <DetailExtraInfoSection
          mainAddress={mainAddress}
          extraInfo={extraInfo}
        />
        <OptionSection options={options} />
        {imageUrls[0] && <ImageCarouselSection imageUrls={imageUrls} />}
        <ReviewSection />
      </section>
    </>
  );
}
