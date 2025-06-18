import { useStepValidation } from '@/hooks/useStepValidation';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  FormHeading,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
import { useFormContext, useFormState } from 'react-hook-form';

export default function HostInfoStep({
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

  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="호스트 유저 정보를 입력해 주세요."
        subHeading="정산에 필요한 정보를 입력하는 란입니다."
      />
      <CommonInputWithLabel
        label="사업자번호"
        id="businessRegistrationNumber"
        placeholder="홍길동"
        errorMessage={
          touchedFields?.businessRegistrationNumber
            ? errors.businessRegistrationNumber?.message
            : undefined
        }
        maxLength={10}
        {...register('businessRegistrationNumber')}
      />
      <CommonInputWithLabel
        label="계좌번호"
        id="accountNumber"
        placeholder="010-1234-5678"
        errorMessage={
          touchedFields?.accountNumber
            ? errors.accountNumber?.message
            : undefined
        }
        maxLength={13}
        {...register('accountNumber')}
      />
      <StepButtons
        onBack={onBack}
        onNext={onNext}
        theme="secondary"
        disabledNext={!isStepValid}
      />
    </section>
  );
}
