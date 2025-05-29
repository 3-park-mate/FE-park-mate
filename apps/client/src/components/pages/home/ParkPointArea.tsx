import { Button } from '@repo/ui/components/base/button';

export default function ParkPointArea() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-[13px] text-gray-dark-2 leading-2">파크포인트</p>
        <p className="text-[28px] font-bold">237,500</p>
      </div>
      <Button className="bg-primary-dark">충전</Button>
    </div>
  );
}
