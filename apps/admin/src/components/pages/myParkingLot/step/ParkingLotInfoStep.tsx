'use client';
import AddressSearchField from '@/components/common/AddressSearchField';
import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  FormHeading,
} from '@repo/ui/components/common/CommonLayouts';
import CommonTextArea from '@repo/ui/components/common/CommonTextArea';

export default function EmailVerifyStep({ onNext }: { onNext?: () => void }) {
  return (
    <section className="space-y-5">
      <FormHeading>주차장 정보를 작성해 주세요.</FormHeading>
      <CommonInputWithLabel
        label="주차장명"
        id="name"
        placeholder="주차장명을 작성해 주세요."
        maxLength={40}
      />
      <AddressSearchField />
      <CommonTextArea
        label="기타 정보"
        id="extraInfo"
        placeholder="기본 정보 이외에 사용자에게 알릴 정보를 작성해 주세요. (최대 500자)"
        maxLength={500}
      />

      <CommonButton onClick={onNext} className="mt-6 bg-secondary">
        다음
      </CommonButton>
    </section>
  );
}
