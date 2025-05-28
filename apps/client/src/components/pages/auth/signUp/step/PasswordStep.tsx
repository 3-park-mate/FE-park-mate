import { SignUpStoreDataType } from '@/types/authDataTypes';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import PasswordInputWithLabel from '@repo/ui/components/common/PasswordInputWithLabel';
import { useFormContext, useFormState } from 'react-hook-form';

export default function PasswordStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register } = useFormContext<SignUpStoreDataType>();
  const { errors } = useFormState<SignUpStoreDataType>();

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold pt-10 pb-5">
        비밀번호를 입력해 주세요.
      </h1>
      <PasswordInputWithLabel
        label="비밀번호"
        id="password"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        errorMessage={errors.password?.message}
        maxLength={20}
        {...register('password')}
      />
      <PasswordInputWithLabel
        label="비밀번호 확인"
        id="confirmPassword"
        placeholder="비밀번호 확인"
        errorMessage={errors.confirmPassword?.message}
        maxLength={20}
        {...register('confirmPassword')}
      />

      <CommonButton onClick={onNext} className="mt-6">
        다음
      </CommonButton>
    </section>
  );
}
