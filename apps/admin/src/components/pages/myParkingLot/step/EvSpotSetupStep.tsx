import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import ChargeSelectSection from '../ChargeSelectSection';

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
      <ChargeSelectSection />
      <div className="space-y-3 mt-10">
        <CommonButton
          onClick={onBack}
          className="bg-white border border-secondary text-secondary"
        >
          이전
        </CommonButton>
        <CommonButton onClick={onNext} className="bg-secondary">
          다음
        </CommonButton>
      </div>
    </section>
  );
}
