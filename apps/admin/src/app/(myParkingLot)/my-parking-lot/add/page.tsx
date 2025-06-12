import PageHeader from '@/components/layouts/PageHeader';
import AddParkingLotFunnel from '@/components/pages/myParkingLot/AddParkingLotFunnel';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <PageHeader title="주차장 등록" type="form" />
      <main>
        <Suspense fallback={<div></div>}>
          <AddParkingLotFunnel />
        </Suspense>
      </main>
    </>
  );
}
