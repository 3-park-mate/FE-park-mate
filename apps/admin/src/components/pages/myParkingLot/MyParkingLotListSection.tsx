import { ParkingLotItem } from '@/types/parkingDataTypes';
import ParkingCardItem from '../../common/ParkingCardItem';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';
import { Plus } from 'lucide-react';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import ParkingCardItemSkeleton from '@/components/common/ParkingCardItemSkeleton';

export default function MyParkingLotListSection({
  parkingLotDatas,
}: {
  parkingLotDatas: ParkingLotItem[];
}) {
  if (!parkingLotDatas)
    return (
      <PaddedLayout className="py-6">
        <section className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ParkingCardItemSkeleton key={index} />
          ))}
        </section>
      </PaddedLayout>
    );

  return (
    <PaddedLayout className="py-6">
      <section className="grid grid-cols-2 gap-4">
        {parkingLotDatas.map((item, index) => (
          <ParkingCardItem key={index} {...item} />
        ))}
      </section>
      <Link
        href="/my-parking-lot/add"
        className={`${buttonVariants({ variant: 'default' })} w-full h-10 bg-secondary mt-8`}
      >
        <Plus />
        주차장 등록하기
      </Link>
    </PaddedLayout>
  );
}
