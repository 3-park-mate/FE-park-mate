import ButtonWrapper from '@/components/common/ButtonWrapper';
import AmountInfo from './AmountInfo';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';
import { useReservationAmount } from '@/hooks/useReservationAmount';
import { useFormContext } from 'react-hook-form';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';

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
  const { setValue } = useFormContext<CreateReservationRequestType>();
  const { amount, loading, isScheduleSelected } = useReservationAmount();

  const handleClick = () => {
    if (hasAmountInfo && typeof amount === 'number') {
      setValue('amount', amount);
    }
    onClick();
  };

  return (
    <ButtonWrapper className="flex items-center justify-between border-t-1 pt-4 bg-white">
      {hasAmountInfo && (
        <AmountInfo
          amount={amount}
          isLoading={loading}
          isScheduleSelected={isScheduleSelected}
        />
      )}
      <Button
        type={type}
        onClick={handleClick}
        className={cn('h-14 text-lg font-semibold', className)}
      >
        {label}
      </Button>
    </ButtonWrapper>
  );
}
