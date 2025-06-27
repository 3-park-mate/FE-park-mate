import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';

export default function CheckSpotsButton({
  selectedDay,
  selectedTime,
}: {
  selectedDay: { from: Date | undefined; to?: Date | undefined };
  selectedTime: { entryTime: string; exitTime: string };
}) {
  return (
    <ButtonWrapper className="flex items-center justify-between border-t-1 pt-3">
      <p className="font-semibold">
        3,000원
        <span className="ml-1 text-gray-2 text-sm">/30분</span>
      </p>
      <Button
        className={cn(
          'h-12 text-md',
          selectedDay && selectedTime.entryTime && selectedTime.exitTime
            ? 'bg-primary'
            : 'bg-gray-1'
        )}
        disabled={
          !(selectedDay && selectedTime.entryTime && selectedTime.exitTime)
        }
      >
        예약 가능 주차면 확인
      </Button>
    </ButtonWrapper>
  );
}
