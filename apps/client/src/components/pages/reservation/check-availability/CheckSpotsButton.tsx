import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';

export default function CheckSpotsButton({
  selectedDateTime,
}: {
  selectedDateTime: {
    entryDateTime: Date | null;
    exitDateTime: Date | null;
  };
}) {
  const isButtonActive =
    selectedDateTime.entryDateTime && selectedDateTime.exitDateTime;

  return (
    <ButtonWrapper className="flex items-center justify-between border-t-1 pt-4">
      <div>
        {selectedDateTime.entryDateTime && selectedDateTime.exitDateTime && (
          <p className="leading-tight">
            결제금액: <span className="text-xl">9,000원</span>
          </p>
        )}
        <p className="font-semibold leading-0">
          3,000원
          <span className="ml-1 text-gray-2 text-sm">/30분</span>
        </p>
      </div>
      <Button
        className={cn(
          'h-12 text-md',
          isButtonActive ? 'bg-primary' : 'bg-gray-1'
        )}
        disabled={!isButtonActive}
      >
        예약 가능 주차면 확인
      </Button>
    </ButtonWrapper>
  );
}
