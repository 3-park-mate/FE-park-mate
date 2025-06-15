import { useStepValidation } from '@/hooks/useStepValidation';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { FormHeading } from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
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
  const { errors, touchedFields } = useFormState<SignUpStoreDataType>();

  const VERIFY_FIELDS = ['name', 'phoneNumber'] as const;

  const { isStepValid } = useStepValidation<SignUpStoreDataType>(VERIFY_FIELDS);

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
      <FormHeading>유저 정보를 입력해 주세요.</FormHeading>
      <CommonInputWithLabel
        label="이름"
        id="name"
        placeholder="홍길동"
        errorMessage={touchedFields?.name ? errors.name?.message : undefined}
        maxLength={10}
        {...register('name')}
      />
      <CommonInputWithLabel
        label="전화번호"
        id="phoneNumber"
        placeholder="010-1234-5678"
        errorMessage={
          touchedFields?.phoneNumber ? errors.phoneNumber?.message : undefined
        }
        maxLength={13}
        {...register('phoneNumber', { onChange: handlePhoneNumberChange })}
      />
      <StepButtons
        onBack={onBack}
        onNext={onNext}
        theme="primary"
        disabledNext={!isStepValid}
      />
    </section>
  );
}
