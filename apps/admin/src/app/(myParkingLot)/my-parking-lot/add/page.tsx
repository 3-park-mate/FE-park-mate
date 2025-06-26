import { options } from '@/app/api/auth/[...nextauth]/options';
import PageHeader from '@/components/layouts/PageHeader';
import AddParkingLotFunnel from '@/components/pages/myParkingLot/AddParkingLotFunnel';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export default async function page() {
  const session = await getServerSession(options);
  if (!session) return;

  const hostUuid = session.user.uuid;

  return (
    <>
      <PageHeader title="주차장 등록" type="form" />
      <main className="pb-32">
        <Suspense fallback={<div></div>}>
          <AddParkingLotFunnel hostUuid={hostUuid} />
        </Suspense>
      </main>
    </>
  );
}
