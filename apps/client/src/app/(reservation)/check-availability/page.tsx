import AvailableSpotsSheet from '@/components/pages/reservation/check-availability/AvailableSpotsSheet';
import { FilterScheduleSheet } from '@/components/pages/reservation/check-availability/FilterScheduleSheet';
import { Sheet, SheetTrigger } from '@repo/ui/components/base/sheet';

export default function Page() {
  return (
    <>
      <Sheet>
        <SheetTrigger>일정 선택</SheetTrigger>
        <FilterScheduleSheet parkingLotUuid="d1c94454-8ee2-4797-ad12-d3fdeb03385d" />
      </Sheet>
      <Sheet>
        <SheetTrigger>잔여 주차면</SheetTrigger>
        <AvailableSpotsSheet />
      </Sheet>
    </>
  );
}
