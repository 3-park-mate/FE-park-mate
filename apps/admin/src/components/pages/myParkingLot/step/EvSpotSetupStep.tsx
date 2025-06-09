import { Button } from '@repo/ui/components/base/button';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';

export default function EvSpotSetupStep({ onNext }: { onNext?: () => void }) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="전기차 충전이 가능한 주차면을 설정해 주세요."
        subHeading="각 주차면 충전기의 충전 타입을 확인하시고, 가능한 충전 타입을 모두 선택해 주세요."
      />
      <CommonButton className="mt-8 bg-secondary">다음</CommonButton>
    </section>
  );
}
