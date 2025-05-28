import { SignUpStoreDataType } from '@/types/signUpDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

export default function UserInfoStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register, setValue } = useFormContext<SignUpStoreDataType>();
  const { errors } = useFormState<SignUpStoreDataType>();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    let formattedValue = rawValue;
    if (rawValue.length > 6) {
      formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(
        3,
        7
      )}-${rawValue.slice(7, 11)}`;
    } else if (rawValue.length > 3) {
      formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}`;
    }
    if (
      e.nativeEvent instanceof InputEvent &&
      e.nativeEvent.inputType === 'deleteContentBackward'
    ) {
      const cursorPosition = e.target.selectionStart ?? formattedValue.length;
      if (formattedValue[cursorPosition - 1] === '-') {
        formattedValue =
          formattedValue.slice(0, cursorPosition - 1) +
          formattedValue.slice(cursorPosition);
      }
    }

    setValue('phoneNumber', formattedValue);
  };

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold pt-10 pb-5">
        유저 정보를 입력해 주세요.
      </h1>
      <CommonInputWithLabel
        label="이름"
        id="name"
        placeholder="홍길동"
        errorMessage={errors.name?.message}
        maxLength={10}
        {...register('name')}
      />
      <CommonInputWithLabel
        label="전화번호"
        id="phoneNumber"
        placeholder="010-1234-5678"
        errorMessage={errors.phoneNumber?.message}
        maxLength={13}
        {...register('phoneNumber', { onChange: handlePhoneNumberChange })}
      />
      <CommonButton onClick={onNext} className="mt-6">
        다음
      </CommonButton>
    </section>
  );
}
