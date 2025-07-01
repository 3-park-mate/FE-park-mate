import ButtonWrapper from '@/components/common/ButtonWrapper';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';
import { useFormContext } from 'react-hook-form';

export default function FilterScheduleButton() {
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <ButtonWrapper className="pt-5 border-t-1 bg-white">
      <Button
        type="submit"
        disabled={!isValid}
        className={cn(
          'w-full h-11 text-md',
          isValid ? 'bg-primary' : 'bg-gray-1'
        )}
      >
        일정 선택 완료
      </Button>
    </ButtonWrapper>
  );
}
