import { useStepValidation } from '@/hooks/useStepValidation';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import { formatPhoneNumber } from '@/utils/formUtils';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { FormHeading } from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
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
    const { value, selectionStart } = e.target;

    const inputType =
      e.nativeEvent instanceof InputEvent ? e.nativeEvent.inputType : undefined;

    const newFormattedValue = formatPhoneNumber(
      value,
      inputType,
      selectionStart ?? value.length
    );

    setValue('phoneNumber', newFormattedValue);
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
