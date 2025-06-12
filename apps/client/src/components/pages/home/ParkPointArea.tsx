import { Button } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function ParkPointArea() {
  return (
    <PaddedLayout className="flex justify-between items-center pt-3 pb-5">
      <div>
        <p className="text-13px text-gray-dark-2 leading-2">파크포인트</p>
        <p className="text-[28px] font-bold">237,500</p>
      </div>
      <Button className="bg-primary">충전</Button>
    </PaddedLayout>
  );
}
