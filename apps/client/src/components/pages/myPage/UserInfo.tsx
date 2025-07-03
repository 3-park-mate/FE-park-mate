import { getUserInfoData } from '@/actions/user/user-service';
import { UserInfoDataType } from '@/types/userDataTypes';
import { getUserEmailData } from '@/actions/auth/auth-service';
import { buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';

export default async function UserInfo() {
  const [userDataResponse, emailResponse] = await Promise.all([
    getUserInfoData(),
    getUserEmailData(),
  ]);

  const userData = (
    userDataResponse as { success: true; data: UserInfoDataType }
  ).data;
  const email = (emailResponse as { success: true; data: string }).data;

  return (
    <PaddedLayout className="bg-gray-light-1 pt-4 pb-7">
      <p className="text-17px">
        <b>{userData.name}</b>님, 안녕하세요.
      </p>
      <p className="text-gray-3 text-sm">{email}</p>
      <div className="bg-white p-5 mt-5 rounded-t-lg">
        <p className="text-gray-3 text-15px">보유 포인트</p>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">
            {userData.point.toLocaleString()}원
          </h2>
          <Link
            href="/payment/point"
            className={`${buttonVariants({ variant: 'default' })}`}
          >
            충전
          </Link>
        </div>
      </div>
      <button className="w-full bg-white text-center rounded-b-lg border-t p-2 cursor-pointer">
        <p className="text-gray-3 text-sm">사용 내역</p>
      </button>
    </PaddedLayout>
  );
}
