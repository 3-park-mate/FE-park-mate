import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import MyCarItem from './MyCarItem';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';
import { Plus } from 'lucide-react';

export default function MyCarListSection({
  VehiclesData,
}: {
  VehiclesData: { vehicleUuid: string }[];
}) {
  return (
    <PaddedSection className="space-y-4 py-4">
      {VehiclesData.map((item) => (
        <MyCarItem key={item.vehicleUuid} vehicleUuid={item.vehicleUuid} />
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
