import DetailExtraInfoSection from './DetailExtraInfoSection';
import ImageCarouselSection from './ImageCarouselSection';
import ReviewSection from './ReviewSection';

export default function ParkingDetailContent() {
  return (
    <section className="bg-inner-background-gray space-y-3">
      <DetailExtraInfoSection />
      <ImageCarouselSection />
      <ReviewSection />
    </section>
  );
}
