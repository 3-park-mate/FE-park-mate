'use client';
import AddressSearchField from '@/components/common/AddressSearchField';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import CommonTextArea from '@repo/ui/components/common/CommonTextArea';

export default function EmailVerifyStep({ onNext }: { onNext?: () => void }) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="주차장 정보를 작성해 주세요."
        subHeading="사용자에게 보여질 주차장 기본 정보를 입력하는 란입니다."
      />
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
      {/* <div className="grid w-full items-center gap-1.5">
        <label className="font-semibold text-13px text-gray-3 ms-1">
          전기차 충전 여부
        </label>
        <div className="flex gap-3 w-full">
          <Button className="flex-1 bg-gray-1 h-11">네</Button>
          <Button className="flex-1 bg-secondary h-11">아니오</Button>
        </div>
      </div> */}

      <CommonButton onClick={onNext} className="mt-6 bg-secondary">
        다음
      </CommonButton>
    </section>
  );
}
