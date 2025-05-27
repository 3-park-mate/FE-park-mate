import { SignUpStoreDataType } from '@/types/storeDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function UserInfoStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register } = useFormContext<SignUpStoreDataType>();

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold pt-10 pb-5">
        유저 정보를 입력해 주세요.
      </h1>
      <CommonInputWithLabel label="이름" id="name" placeholder="홍길동" />
      <CommonInputWithLabel
        label="전화번호"
        id="text"
        placeholder="010-1234-5678"
        {...register('phoneNumber')}
      />
      <CommonButton onClick={onNext} className="mt-6">
        다음
      </CommonButton>
    </section>
  );
}
