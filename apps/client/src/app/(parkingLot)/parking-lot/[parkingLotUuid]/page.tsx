import PageHeader from '@/components/layouts/PageHeader';
import DetailInfoSection from '@/components/pages/parkingLot/DetailInfoSection';
import DetailInfoMenuSection from '@/components/pages/parkingLot/DetailInfoMenuSection';
import ExtraInfoSection from '@/components/pages/parkingLot/ExtraInfoSection';
import { HomeTabMenu } from '@/components/pages/home/HomeTabMenu';
import ReviewSection from '@/components/pages/parkingLot/ReviewSection';

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
          {/* 이미지 캐러셀 여기 들어가고 썸네일에는 사진 하나만 */}
          <ReviewSection />
        </section>
      </main>
    </>
  );
}
