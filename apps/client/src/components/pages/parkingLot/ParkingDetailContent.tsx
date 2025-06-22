import DetailInfoSection from './DetailInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';
import OptionSection from './OptionSection';
import { ParkingLotOption } from '@/types/parkingDataTypes';

export default function ParkingDetailContent({
  mainAddress,
  parkingLotUuid,
  extraInfo,
  imageUrls,
  options,
  evChargeTypes,
}: {
  mainAddress: string;
  parkingLotUuid: string;
  extraInfo: string;
  imageUrls: string[];
  options: ParkingLotOption[];
  evChargeTypes: string[];
}) {
  return (
    <section className="space-y-3">
      <DetailInfoSection
        mainAddress={mainAddress}
        parkingLotUuid={parkingLotUuid}
        extraInfo={extraInfo}
      />
      <OptionSection options={options} evChargeTypes={evChargeTypes} />
      {imageUrls[0] && <ImageCarouselSection imageUrls={imageUrls} />}
      <ReviewSection />
    </section>
  );
}
