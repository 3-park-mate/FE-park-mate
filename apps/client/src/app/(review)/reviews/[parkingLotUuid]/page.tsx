import PageHeader from '@/components/layouts/PageHeader';
import ReviewList from '@/components/pages/review/ReviewList';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = <div>리뷰를 찾을 수 없습니다.</div>;

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;

  return (
    <div className="bg-inner-background-gray min-h-screen">
      <PageHeader title="리뷰" />
      <main className="pb-32">
        <ReviewList />
      </main>
    </div>
  );
}
