import { getUserInfoData } from '@/actions/user/user-service';
import { UserInfoDataType } from '@/types/userDataTypes';
import { buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';

export default async function ParkPointArea() {
  const { data: userData } = (await getUserInfoData()) as {
    success: true;
    data: UserInfoDataType;
  };

  return (
    <PaddedLayout className="flex justify-between items-center pt-3 pb-5">
      <div>
        <p className="text-13px text-gray-dark-2 leading-2">파크포인트</p>
        <p className="text-[28px] font-bold">
          {userData.point.toLocaleString()}원
        </p>
      </div>
      <Link
        href="/payment/point"
        className={`${buttonVariants({ variant: 'default' })}`}
      >
        충전
      </Link>
    </PaddedLayout>
  );
}
