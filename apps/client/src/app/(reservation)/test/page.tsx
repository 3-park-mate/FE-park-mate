import { FilterScheduleSheet } from '@/components/pages/reservationi/FilterScheduleSheet';
import { Sheet, SheetTrigger } from '@repo/ui/components/base/sheet';

export default function Page() {
  return (
    <Sheet>
      <SheetTrigger>일정 선택</SheetTrigger>
      <FilterScheduleSheet />
    </Sheet>
  );
}
