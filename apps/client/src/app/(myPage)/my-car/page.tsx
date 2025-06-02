import PageHeader from '@/components/layouts/PageHeader';
import MyCarListSection from '@/components/pages/myPage/myCar/MyCarListSection';

export default function page() {
  return (
    <>
      <PageHeader title="내 차량" />
      <main>
        <MyCarListSection />
      </main>
    </>
  );
}
