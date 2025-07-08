import ButtonWrapper from '@/components/common/ButtonWrapper';
import AmountInfo from './AmountInfo';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';

export default function ReservationSheetButton({
  type = 'button',
  onClick,
  label,
  className,
  hasAmountInfo = true,
}: {
  type?: 'button' | 'submit';
  onClick: () => void;
  label: string;
  className?: string;
  hasAmountInfo?: boolean;
}) {
  return (
    <ButtonWrapper className="flex items-center justify-between border-t-1 pt-4 bg-white">
      {hasAmountInfo && <AmountInfo />}
      <Button
        type={type}
        onClick={onClick}
        className={cn('h-14 text-lg font-semibold', className)}
      >
        {label}
      </Button>
    </ButtonWrapper>
  );
}
