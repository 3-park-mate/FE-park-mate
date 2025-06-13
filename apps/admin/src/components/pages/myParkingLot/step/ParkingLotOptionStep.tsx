import {
  HeadingWithDesc,
  OptionIconWithText,
} from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '../StepButtons';
import EVChargingIcon from '@repo/ui/components/icon/options/EVChargingIcon';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { cn } from '@repo/ui/lib/utils';
import ParkingLotOptionItem from '../ParkingLotOptionItem';

export default function ParkingLotOptionStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="주차장 옵션을 선택해 주세요."
        subHeading="하단 옵션들 중 주차장이 제공하는 기능들을 전부 체크해 주세요."
      />
      <section className="grid grid-cols-3 xs:grid-cols-5 gap-4 border rounded-xl px-6 py-10 relative">
        {[...Array(10)].map((_, index) => (
          <ParkingLotOptionItem key={index} isSelected={index === 1} />
        ))}
      </section>

      <StepButtons onBack={onBack} onNext={onNext} />
    </section>
  );
}
