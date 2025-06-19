import { useStepValidation } from '@/hooks/useStepValidation';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
import { useFormContext, useFormState } from 'react-hook-form';
import BankAccountInput from '../BankAccountInput';
import CommonSelect from '@repo/ui/components/common/CommonSelect';

export default function HostInfoStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register, setValue, watch } = useFormContext<SignUpStoreDataType>();
  const { errors, touchedFields } = useFormState<SignUpStoreDataType>();

  const VERIFY_FIELDS = [
    'businessRegistrationNumber',
    'bankName',
    'accountNumber',
    'settlementCycle',
  ] as const;

  const { isStepValid } = useStepValidation<SignUpStoreDataType>(VERIFY_FIELDS);

  const selectedsettlementCycle = watch('settlementCycle') ?? 15;
  const settlementCycleErrorMessage = touchedFields?.settlementCycle
    ? errors.settlementCycle?.message
    : undefined;

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
        description="올바른 주차장 사업자번호를 작성해 주셔야 호스트 서비스 이용이 가능합니다. ('-' 제외)"
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
      <CommonSelect
        label="정산 주기"
        placeholder="정산 주기를 선택하세요"
        value={String(selectedsettlementCycle)}
        onChange={(value) =>
          setValue('settlementCycle', Number(value) as 15 | 30)
        }
        options={[
          { label: '15일', value: '15' },
          { label: '30일', value: '30' },
        ]}
        error={!!settlementCycleErrorMessage}
        errorMessage={settlementCycleErrorMessage}
        description="선택하신 정산 주기에 따라 계좌번호로 주차장 이용 금액이 입금됩니다."
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
