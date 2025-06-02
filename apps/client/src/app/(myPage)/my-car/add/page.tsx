import PageHeader from '@/components/layouts/PageHeader';
import AddMyCarForm from '@/components/pages/myPage/myCar/AddMyCarForm';

export default function page() {
  return (
    <>
      <PageHeader title="차량 등록" />
      <main>
        <AddMyCarForm />
      </main>
    </>
  );
}
