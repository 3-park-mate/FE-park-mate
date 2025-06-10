import {
  OptionIconWithText,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import { Car, Plug } from 'lucide-react';

export default function OptionSection() {
  return (
    <PaddedSection className="bg-white py-7 mb-3" id="options">
      <h2 className="text-lg font-semibold pb-5">주차장 옵션</h2>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-3 gap-y-4">
        <OptionIconWithText Icon={Plug}>전기차충전</OptionIconWithText>
        <OptionIconWithText Icon={Car}>경차</OptionIconWithText>
        <OptionIconWithText Icon={Car}>소형차</OptionIconWithText>
        <OptionIconWithText Icon={Car}>중형차</OptionIconWithText>
        <OptionIconWithText Icon={Car}>대형차</OptionIconWithText>
      </div>
    </PaddedSection>
  );
}
