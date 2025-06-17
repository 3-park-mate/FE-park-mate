import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import MyCarItem from './MyCarItem';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';
import { Plus } from 'lucide-react';
import { VehicleDataDummy } from '@/data/myPageDummyDatas';

export default function MyCarListSection() {
  return (
    <PaddedSection className="space-y-4 py-4">
      {VehicleDataDummy.map((car) => (
        <MyCarItem
          key={car.userVehicleNumbersId}
          userVehicleNumbersId={car.userVehicleNumbersId}
          vehicleNumber={car.vehicleNumber}
          isDefault={car.isDefault}
          nickname={car.nickname}
        />
      ))}
      <Link
        href="/my-car/add"
        className={`${buttonVariants({ variant: 'default' })} w-full h-10 bg-primary mt-2`}
      >
        <Plus />내 차량 추가
      </Link>
      <p className="text-sm text-gray-3">
        · 차량은 최대 10개 등록할 수 있습니다.
      </p>
    </PaddedSection>
  );
}
