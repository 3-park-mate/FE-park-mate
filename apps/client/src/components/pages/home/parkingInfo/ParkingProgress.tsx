import { progressBarStatusMap } from '@/data/initialDatas';
import { Progress } from '@repo/ui/components/base/progress';

export default function ParkingProgress() {
  const progressValue = 50;

  const status = progressBarStatusMap.find(
    ({ threshold }) => progressValue >= threshold
  );

  return (
    <div className="pb-6">
      <p
        className={`text-xs text-center pb-2 ${
          status?.remainingColor || 'text-gray-dark-2'
        }`}
      >
        {status?.remainingText}
      </p>
      <Progress value={progressValue} className={status?.progressColor} />
      <p
        className={`pt-5 font-semibold text-15px ${
          status?.labelColor || 'text-primary-dark-50'
        }`}
      >
        {status?.label}
      </p>
    </div>
  );
}
