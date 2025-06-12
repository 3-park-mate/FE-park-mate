'use client';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import SpotCountSelectSection from '../SpotCountSelectSection';
import { StepButtons } from '../StepButtons';

export default function ParkingSpotSetupStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="수용 가능한 차량 종류에 따른 주차면수를 입력해 주세요."
        subHeading="각각 주차면의 면적을 확인하시고, 최대로 수용 가능한 차량 종류에 따라 주차면수를 작성해 주세요."
      />
      <SpotCountSelectSection />
      <StepButtons onBack={onBack} onNext={onNext} />
    </section>
  );
}
