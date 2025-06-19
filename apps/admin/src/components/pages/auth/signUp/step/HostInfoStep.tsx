import { useStepValidation } from '@/hooks/useStepValidation';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
import { useFormContext, useFormState } from 'react-hook-form';
import BankAccountInput from '../BankAccountInput';

export default function HostInfoStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register } = useFormContext<SignUpStoreDataType>();
  const { errors, touchedFields } = useFormState<SignUpStoreDataType>();

  const VERIFY_FIELDS = [
    'businessRegistrationNumber',
    'bankName',
    'accountNumber',
  ] as const;

  const { isStepValid } = useStepValidation<SignUpStoreDataType>(VERIFY_FIELDS);

  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="호스트 유저 정보를 입력해 주세요."
        subHeading="호스트 유저 검증과 정산에 필요한 정보를 입력하는 란입니다."
      />
      <CommonInputWithLabel
        label="사업자등록번호"
        id="businessRegistrationNumber"
        placeholder="사업자등록번호를 입력하세요. (10자리)"
        errorMessage={
          touchedFields?.businessRegistrationNumber
            ? errors.businessRegistrationNumber?.message
            : undefined
        }
        maxLength={10}
        {...register('businessRegistrationNumber', {
          onChange: (e) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^0-9]/g,
              ''
            );
          },
        })}
      />
      <BankAccountInput />
      <StepButtons
        onBack={onBack}
        onNext={onNext}
        theme="secondary"
        disabledNext={!isStepValid}
      />
    </section>
  );
}
