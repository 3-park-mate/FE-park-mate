import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import ReviewList from '@/components/pages/review/ReviewList';
import ReviewListHeader from '@/components/pages/review/ReviewListHeader';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = (
    <NotFoundLayout
      heading="리뷰를 찾을 수 없습니다."
      subheading="잘못된 url 접근이 아닌지 확인해 주세요."
      buttonHref="/"
    />
  );

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;

  return (
    <div className="bg-inner-background-gray min-h-screen">
      <PageHeader title="방문자 리뷰" />
      <main className="max-w-2xl mx-auto pb-32">
        <ReviewListHeader />
        <ReviewList parkingLotUuid={parkingLotUuid} />
      </main>
    </div>
  );
}
