import ButtonWrapper from '@/components/common/ButtonWrapper';
import { toLocalISOString } from '@/utils/datetimeUtils';
import { Button } from '@repo/ui/components/base/button';
import { cn } from '@repo/ui/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function FilterScheduleButton({
  selectedDateTime,
  setOpen,
}: {
  selectedDateTime: {
    entryDateTime: Date | null;
    exitDateTime: Date | null;
  };
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive =
    selectedDateTime.entryDateTime !== null &&
    selectedDateTime.exitDateTime !== null;

  const handleClick = () => {
    if (!isActive) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('entry', toLocalISOString(selectedDateTime.entryDateTime!));
    params.set('exit', toLocalISOString(selectedDateTime.exitDateTime!));

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <ButtonWrapper className="pt-5 border-t-1 bg-white">
      <Button
        onClick={handleClick}
        disabled={!isActive}
        className={cn(
          'w-full h-12 text-md',
          isActive ? 'bg-primary' : 'bg-gray-1'
        )}
      >
        일정 선택 완료
      </Button>
    </ButtonWrapper>
  );
}
