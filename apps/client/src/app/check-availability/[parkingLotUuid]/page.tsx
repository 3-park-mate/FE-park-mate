import { getParkingLotById } from '@/actions/parking/parking-service';
import PageHeader from '@/components/layouts/PageHeader';
import SelectScheduleSection from '@/components/pages/check-availability/SelectScheduleSection';
import {
  HeadingWithDesc,
  PaddedLayout,
} from '@repo/ui/components/common/CommonLayouts';

export default async function page({
  params,
}: {
  params: Promise<{ parkingLotUuid: string }>;
}) {
  const fallback = <div>주차장을 찾을 수 없습니다.</div>;

  const { parkingLotUuid } = await params;
  if (!parkingLotUuid) return fallback;
  const res = await getParkingLotById(parkingLotUuid);
  if (!res.success) return fallback;

  const parkingLotData = res.data;
  if (!parkingLotData) return fallback;

  return (
    <>
      <PageHeader title={parkingLotData.name} />
      <main>
        <PaddedLayout>
          <HeadingWithDesc
            heading="일정 선택"
            subHeading="입출차 시간을 선택하고 타입별 잔여 수를 확인하세요."
            className="pt-3"
          />
          <SelectScheduleSection parkingLotUuid={parkingLotUuid} />
        </PaddedLayout>
      </main>
    </>
  );
}
