import PageHeader from '@/components/layouts/PageHeader';
import DetailInfoSection from '@/components/pages/parkingLot/DetailInfoSection';
import DetailInfoMenuSection from '@/components/pages/parkingLot/DetailInfoMenuSection';
import ExtraInfoSection from '@/components/pages/parkingLot/ExtraInfoSection';
import { HomeTabMenu } from '@/components/pages/home/HomeTabMenu';
import ReviewSection from '@/components/pages/parkingLot/ReviewSection';
import ImageCarouselSection from '@/components/pages/parkingLot/ImageCarouselSection';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const { parkingLotUuid } = await params;

  return (
    <>
      <PageHeader title="주차장 이름" />
      <main>
        <DetailInfoSection />
        <DetailInfoMenuSection />
        <ul className="flex justify-between bg-inner-background-gray">
          <HomeTabMenu tabMenuName="홈" selected={true} />
          <HomeTabMenu tabMenuName="리뷰" />
        </ul>
        <section className="bg-inner-background-gray space-y-3">
          <ExtraInfoSection />
          <ImageCarouselSection />
          <ReviewSection />
        </section>
      </main>
    </>
  );
}
