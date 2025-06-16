import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { cn } from '../../lib/utils';

export function StepButtons({
  onBack,
  onNext,
  className,
  theme = 'secondary',
  disabledNext = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  className?: string;
  theme?: 'primary' | 'secondary';
  disabledNext?: boolean;
}) {
  const isSecondary = theme === 'secondary';

  return (
    <div className={cn('space-y-3 mt-10', className)}>
      {onBack && (
        <CommonButton
          type="button"
          onClick={onBack}
          className={cn(
            'border',
            isSecondary
              ? 'bg-white border-secondary text-secondary'
              : 'bg-white border-primary text-primary'
          )}
        >
          이전
        </CommonButton>
      )}
      {onNext && (
        <CommonButton
          type="button"
          onClick={onNext}
          disabled={disabledNext}
          className={cn(
            isSecondary ? 'bg-secondary' : 'bg-primary',
            'text-white',
            disabledNext && 'opacity-50 cursor-not-allowed'
          )}
        >
          다음
        </CommonButton>
      )}
    </div>
  );
}
