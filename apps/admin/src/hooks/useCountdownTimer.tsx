import { useEffect, useState } from 'react';

export function useCountdownTimer(duration: number, onTimeout: () => void) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (timeLeft <= 0) {
      setActive(false);
      onTimeout();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [active, timeLeft, onTimeout]);

  const start = () => {
    setTimeLeft(duration);
    setActive(true);
  };

  const reset = () => {
    setActive(false);
    setTimeLeft(duration);
  };

  return {
    timeLeft,
    isRunning: active,
    start,
    reset,
  };
}
