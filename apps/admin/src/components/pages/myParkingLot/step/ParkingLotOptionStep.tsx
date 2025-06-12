import {
  HeadingWithDesc,
  OptionIconWithText,
} from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '../StepButtons';
import EVChargingIcon from '@repo/ui/components/icon/options/EVChargingIcon';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { cn } from '@repo/ui/lib/utils';

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
      <section
        className="grid grid-cols-5 gap-x-3 gap-y-8
      border rounded-xl px-6 py-10 relative"
      >
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <OptionIconWithText
              key={index}
              Icon={EVChargingIcon}
              className="bg-inner-background-gray rounded-xl aspect-square justify-center"
            >
              전기차충전
            </OptionIconWithText>
            <Checkbox
              className={cn(
                'w-5 h-5 rounded cursor-pointer border transition-all duration-200 text-white',
                'data-[state=checked]:bg-secondary data-[state=checked]:border-secondary',
                'data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300'
              )}
            />
          </div>
        ))}
      </section>
      <StepButtons onBack={onBack} onNext={onNext} />
    </section>
  );
}
