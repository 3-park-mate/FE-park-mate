import { bankList } from '@/data/initialDatas';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import CommonSelect from '@repo/ui/components/common/CommonSelect';
import { useFormContext, useFormState } from 'react-hook-form';

export default function BankAccountInput() {
  const { register, setValue, watch } = useFormContext<SignUpStoreDataType>();
  const { errors, touchedFields } = useFormState<SignUpStoreDataType>();
  const selectedBank = watch('bankName');

  const bankErrorMessage = touchedFields?.bankName
    ? errors.bankName?.message
    : undefined;

  return (
    <div className="grid w-full items-center gap-1.5">
      <CommonSelect
        label="계좌번호"
        placeholder="은행을 선택하세요"
        value={selectedBank}
        onChange={(value) => setValue('bankName', value)}
        options={bankList}
        error={!!bankErrorMessage}
        errorMessage={bankErrorMessage}
      />
      <CommonInputWithLabel
        id="accountNumber"
        placeholder="계좌번호를 입력하세요. ('-' 포함 최대 18자리)"
        errorMessage={
          touchedFields?.accountNumber
            ? errors.accountNumber?.message
            : undefined
        }
        maxLength={18}
        description="정산 금액이 입금될 계좌를 작성해 주세요. ('-' 포함)"
        {...register('accountNumber')}
      />
    </div>
  );
}
