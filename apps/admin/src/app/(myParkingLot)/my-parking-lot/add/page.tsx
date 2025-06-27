import { getUserInfoData } from '@/actions/auth/auth-service';
import { options } from '@/app/api/auth/[...nextauth]/options';
import PageHeader from '@/components/layouts/PageHeader';
import AddParkingLotFunnel from '@/components/pages/myParkingLot/AddParkingLotFunnel';
import { UserInfoResponseDataType } from '@/types/authDataTypes';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export default async function page() {
  const session = await getServerSession(options);
  if (!session) return;

  const hostUuid = session.user.uuid;
  const { data: userInfo } = (await getUserInfoData()) as {
    success: true;
    data: UserInfoResponseDataType;
  };
  const hostPhoneNumber = userInfo.phoneNumber;

  return (
    <>
      <PageHeader title="주차장 등록" type="form" />
      <main className="pb-32">
        <Suspense fallback={<div></div>}>
          <AddParkingLotFunnel
            hostUuid={hostUuid}
            hostPhoneNumber={hostPhoneNumber}
          />
        </Suspense>
      </main>
    </>
  );
}
