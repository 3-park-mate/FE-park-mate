import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import OperationCalendar from './OperationCalendar';
import OperationEditGuide from './OperationEditGuide';

export default function ParkingOperationEdit() {
  return (
    <PaddedSection className="bg-white rounded-xl py-6" id="operation">
      <h2 className="text-lg font-semibold">운영 정보</h2>
      <p className="mb-4 text-gray-2 text-sm break-keep">
        일별 운영 시간과 시간 단위, 기본 금액 등 운영에 필요한 정보를 설정하는
        란입니다.
      </p>
      <OperationEditGuide />
      <OperationCalendar />
    </PaddedSection>
  );
}
