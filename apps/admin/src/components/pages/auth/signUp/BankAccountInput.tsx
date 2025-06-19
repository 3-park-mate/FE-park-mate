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
        label="은행"
        placeholder="은행을 선택하세요"
        value={selectedBank}
        onChange={(value) => setValue('bankName', value)}
        options={bankList}
        error={!!bankErrorMessage}
        errorMessage={bankErrorMessage}
      />
      <CommonInputWithLabel
        id="accountNumber"
        placeholder="계좌번호를 입력하세요. (최대 14자리)"
        errorMessage={
          touchedFields?.accountNumber
            ? errors.accountNumber?.message
            : undefined
        }
        maxLength={13}
        {...register('accountNumber', {
          onChange: (e) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^0-9]/g,
              ''
            );
          },
        })}
      />
    </div>
  );
}
