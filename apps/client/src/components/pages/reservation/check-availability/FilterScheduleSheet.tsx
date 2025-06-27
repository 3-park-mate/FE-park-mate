import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import SelectScheduleSection from './SelectScheduleSection';

export function FilterScheduleSheet() {
  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-8 pb-28 max-w-[600px]"
    >
      <SheetTitle className="mt-10 text-xl">일정을 선택해주세요</SheetTitle>
      <SheetDescription />
      <SelectScheduleSection />
    </SheetContent>
  );
}
