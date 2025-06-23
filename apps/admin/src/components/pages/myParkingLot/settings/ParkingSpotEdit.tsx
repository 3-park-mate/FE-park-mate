import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function ParkingSpotEdit() {
  return (
    <PaddedSection className="bg-white rounded-xl py-6" id="spot">
      <h2 className="text-lg font-semibold">주차면 정보</h2>
      <p className="mb-4 text-gray-2 text-sm break-keep">
        각각의 주차면 정보를 설정하는 란입니다.
      </p>
    </PaddedSection>
  );
}
