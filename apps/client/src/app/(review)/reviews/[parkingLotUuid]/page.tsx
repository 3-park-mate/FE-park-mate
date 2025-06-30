import NotFoundLayout from '@/components/common/NotFoundLayout';
import PageHeader from '@/components/layouts/PageHeader';
import ReviewList from '@/components/pages/review/ReviewList';

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
      <PageHeader title="주차장이름" />
      <main className="pb-32">
        <ReviewList />
      </main>
    </div>
  );
}
