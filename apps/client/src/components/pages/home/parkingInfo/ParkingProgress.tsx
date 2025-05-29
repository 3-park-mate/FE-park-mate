import { Progress } from '@repo/ui/components/base/progress';

export default function ParkingProgress() {
  return (
    <div className="pb-6">
      <p className="text-xs text-gray-dark-2 text-center pb-2">
        1시간 23분 남음
      </p>
      <Progress value={33} />
      <p className="pt-5 font-semibold text-primary-dark-50 text-15px">
        이용중
      </p>
    </div>
  );
}
