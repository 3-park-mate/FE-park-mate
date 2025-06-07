import PageHeader from '@/components/layouts/PageHeader';
import AddParkingLotFunnel from '@/components/pages/myParkingLot/AddParkingLotFunnel';

export default function page() {
  return (
    <>
      <PageHeader title="주차장 등록" />
      <main>
        <AddParkingLotFunnel />
      </main>
    </>
  );
}
