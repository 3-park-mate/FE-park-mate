import { useStepValidation } from '@/hooks/useStepValidation';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import { FormHeading } from '@repo/ui/components/common/CommonLayouts';
import PasswordInputWithLabel from '@repo/ui/components/common/PasswordInputWithLabel';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
import { useFormContext, useFormState } from 'react-hook-form';

export default function PasswordStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register } = useFormContext<SignUpStoreDataType>();
  const { errors, touchedFields } = useFormState<SignUpStoreDataType>();

  const VERIFY_FIELDS = ['password', 'confirmPassword'] as const;

  const { isStepValid } = useStepValidation<SignUpStoreDataType>(VERIFY_FIELDS);

  return (
    <section className="space-y-5">
      <FormHeading>비밀번호를 입력해 주세요.</FormHeading>
      <PasswordInputWithLabel
        label="비밀번호"
        id="password"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        errorMessage={
          touchedFields?.password ? errors.password?.message : undefined
        }
        maxLength={20}
        {...register('password')}
      />
      <PasswordInputWithLabel
        label="비밀번호 확인"
        id="confirmPassword"
        placeholder="비밀번호 확인"
        errorMessage={
          touchedFields?.confirmPassword
            ? errors.confirmPassword?.message
            : undefined
        }
        maxLength={20}
        {...register('confirmPassword')}
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
