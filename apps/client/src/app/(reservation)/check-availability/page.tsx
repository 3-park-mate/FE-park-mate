import PageHeader from '@/components/layouts/PageHeader';
import SelectScheduleSection from '@/components/pages/reservation/check-availability/SelectScheduleSection';
import {
  HeadingWithDesc,
  PaddedLayout,
} from '@repo/ui/components/common/CommonLayouts';

export default function Page() {
  return (
    <>
      <PageHeader />
      <main>
        <PaddedLayout>
          <HeadingWithDesc
            heading="일정 선택"
            subHeading="입출차 시간을 선택하고 타입별 잔여 수를 확인하세요."
            className="pt-3"
          />
          <SelectScheduleSection parkingLotUuid="d1c94454-8ee2-4797-ad12-d3fdeb03385d" />
        </PaddedLayout>
      </main>
    </>
  );
}
