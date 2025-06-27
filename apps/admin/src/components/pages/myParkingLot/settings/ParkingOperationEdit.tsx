import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import OperationCalendarWithInfo from './OperationCalendarWithInfo';
import OperationEditGuide from './OperationEditGuide';
import { getMonthlyOperationById } from '@/actions/parking/parking-service';

export default async function ParkingOperationEdit({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const res = await getMonthlyOperationById(parkingLotUuid);
  if (!res.success) return;

  const OperationDatas = res.data;

  return (
    <PaddedSection className="bg-white rounded-xl py-6" id="operation">
      <h2 className="text-lg font-semibold">운영 정보</h2>
      <p className="mb-4 text-gray-2 text-sm break-keep">
        일별 운영 시간과 시간 단위, 기본 금액 등 운영에 필요한 정보를 설정하는
        란입니다.
      </p>
      <OperationEditGuide />
      <OperationCalendarWithInfo OperationDatas={OperationDatas} />
    </PaddedSection>
  );
}
