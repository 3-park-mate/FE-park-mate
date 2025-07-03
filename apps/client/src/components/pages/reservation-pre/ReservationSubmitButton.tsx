import ButtonWrapper from '@/components/common/ButtonWrapper';
import React from 'react';
import AmountInfo from './check-availability/AmountInfo';
import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/base/button';

export default function ReservationSubmitButton({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  return (
    <ButtonWrapper className="flex justify-between items-center border-t-1 pt-6">
      <AmountInfo type="total" />
      <div className="space-x-5">
        <Button
          type="submit"
          onClick={onSubmit}
          className={cn('h-12 bg-primary text-white rounded-2xl px-8 text-lg')}
        >
          결제하기
        </Button>
      </div>
    </ButtonWrapper>
  );
}
