'use client';

import { useEffect, useState } from 'react';
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
  const [currentRemainingText, setCurrentRemainingText] = useState('');
  const [currentProgressValue, setCurrentProgressValue] = useState(0);

  const [currentStatus, setCurrentStatus] = useState(
    progressBarStatusMap.find(({ threshold }) => 0 >= threshold)
  );

  useEffect(() => {
    const updateProgress = () => {
      const newProgressValue = calculateProgress(entryTime, exitTime);
      setCurrentProgressValue(newProgressValue);

      const newStatus = progressBarStatusMap.find(
        ({ threshold }) => newProgressValue >= threshold
      );
      setCurrentStatus(newStatus);

      const newRemainingText =
        newStatus?.threshold === 0
          ? formatRemainingTime(exitTime)
          : newStatus?.remainingText;
      setCurrentRemainingText(newRemainingText || '');
    };

    updateProgress();

    // 10초
    const intervalId = setInterval(updateProgress, 10000);

    return () => clearInterval(intervalId);
  }, [entryTime, exitTime]);

  return (
    <div className="pb-6">
      <p
        className={`text-xs text-center pb-2 ${currentStatus?.remainingColor || 'text-gray-dark-2'}`}
      >
        {currentRemainingText}
      </p>
      <Progress
        value={currentProgressValue}
        className={currentStatus?.progressColor}
      />
      <p
        className={`pt-5 font-semibold text-15px ${currentStatus?.labelColor || 'text-primary-dark-50'}`}
      >
        {currentStatus?.label}
      </p>
    </div>
  );
}
