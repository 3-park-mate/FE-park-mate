import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { cn } from '../../lib/utils';

export function StepButtons({
  onBack,
  onNext,
  className,
}: {
  onBack?: () => void;
  onNext?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(`space-y-3 mt-10`, className)}>
      {onBack && (
        <CommonButton
          type="button"
          onClick={onBack}
          className="bg-white border border-secondary text-secondary"
        >
          이전
        </CommonButton>
      )}
      {onNext && (
        <CommonButton type="button" onClick={onNext} className="bg-secondary">
          다음
        </CommonButton>
      )}
    </div>
  );
}
