import { progressBarStatusMap } from '@/data/initialDatas';
import {
  calculateProgress,
  formatRemainingTime,
} from '@/utils/parkingTimeUtils';
import { Progress } from '@repo/ui/components/base/progress';

export default function ParkingProgress({
  entryTime,
  exitTime,
}: {
  entryTime: string;
  exitTime: string;
}) {
  const progressValue = calculateProgress(entryTime, exitTime);

  const status = progressBarStatusMap.find(
    ({ threshold }) => progressValue >= threshold
  );

  const remainingText =
    status?.threshold === 0
      ? formatRemainingTime(exitTime)
      : status?.remainingText;

  return (
    <div className="pb-6">
      <p
        className={`text-xs text-center pb-2 ${status?.remainingColor || 'text-gray-dark-2'}`}
      >
        {remainingText}
      </p>
      <Progress value={progressValue} className={status?.progressColor} />
      <p
        className={`pt-5 font-semibold text-15px ${status?.labelColor || 'text-primary-dark-50'}`}
      >
        {status?.label}
      </p>
    </div>
  );
}
