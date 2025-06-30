import DetailInfoSection from './DetailInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';
import OptionSection from './OptionSection';
import {
  EVChargeType,
  ParkingLotOption,
  ParkingSpotType,
} from '@/types/parkingDataTypes';

export default function ParkingDetailContent({
  mainAddress,
  parkingLotUuid,
  extraInfo,
  imageUrls,
  options,
  evChargeTypes,
  parkingSpotTypes,
  latitude,
  longitude,
}: {
  mainAddress: string;
  parkingLotUuid: string;
  extraInfo: string;
  imageUrls: { imageUrl: string }[];
  options: ParkingLotOption[];
  evChargeTypes: EVChargeType[];
  parkingSpotTypes: ParkingSpotType[];
  latitude: number;
  longitude: number;
}) {
  return (
    <section className="space-y-3">
      <DetailInfoSection
        mainAddress={mainAddress}
        parkingLotUuid={parkingLotUuid}
        extraInfo={extraInfo}
        latitude={latitude}
        longitude={longitude}
      />
      <OptionSection
        options={options}
        evChargeTypes={evChargeTypes}
        parkingSpotTypes={parkingSpotTypes}
      />
      {imageUrls[0] && (
        <ImageCarouselSection
          imageUrls={imageUrls.map((img) => img.imageUrl)}
        />
      )}
      <ReviewSection parkingLotUuid={parkingLotUuid} />
    </section>
  );
}
