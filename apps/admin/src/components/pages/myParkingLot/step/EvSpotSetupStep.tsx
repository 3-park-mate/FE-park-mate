import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import EvSpotSetupSection from '../EvSpotSetupSection';
import ChargingTypeGuide from '../ChargingTypeGuide';
import { StepButtons } from '../StepButtons';

export default function EvSpotSetupStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="전기차 충전이 가능한 주차면을 설정해 주세요."
        subHeading="각 주차면 충전기의 커넥터 타입을 확인하시고, 가능한 충전 타입을 모두 선택해 주세요."
      />
      <ChargingTypeGuide />
      <EvSpotSetupSection />
      <StepButtons onBack={onBack} onNext={onNext} />
    </section>
  );
}
