import {
  OptionIconWithText,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import EVChargingIcon from '@repo/ui/components/icon/options/EVChargingIcon';

export default function OptionSection() {
  return (
    <PaddedSection className="bg-white py-7 mb-3" id="options">
      <h2 className="text-lg font-semibold pb-5">주차장 옵션</h2>
      <div className="grid grid-cols-5 gap-x-3 gap-y-8 p-1 py-4">
        {[...Array(10)].map((_, index) => (
          <OptionIconWithText key={index} Icon={EVChargingIcon}>
            전기차충전
          </OptionIconWithText>
        ))}
      </div>
    </PaddedSection>
  );
}
