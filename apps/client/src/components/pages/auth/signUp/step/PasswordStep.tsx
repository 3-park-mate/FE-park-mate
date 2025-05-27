import { SignUpStoreDataType } from '@/types/storeDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { useFormContext } from 'react-hook-form';

export default function PasswordStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register } = useFormContext<SignUpStoreDataType>();
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold pt-10 pb-5">
        비밀번호를 입력해 주세요.
      </h1>
      <CommonInputWithLabel
        label="비밀번호"
        id="password"
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        {...register('password')}
      />
      <CommonInputWithLabel
        label="비밀번호 확인"
        id="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        {...register('confirmPassword')}
      />

      <CommonButton onClick={onNext} className="mt-6">
        다음
      </CommonButton>
    </section>
  );
}
