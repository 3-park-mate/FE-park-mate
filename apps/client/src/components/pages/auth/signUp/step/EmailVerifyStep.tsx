import { SignUpStoreDataType } from '@/types/authDataTypes';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { useFormContext, useFormState } from 'react-hook-form';

export default function EmailVerifyStep({ onNext }: { onNext?: () => void }) {
  const { register } = useFormContext<SignUpStoreDataType>();
  const { errors } = useFormState<SignUpStoreDataType>();

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold pt-10 pb-5">
        이메일 인증을 해주세요.
      </h1>
      <div className="flex gap-2">
        <CommonInputWithLabel
          label="이메일 주소"
          id="email"
          placeholder="abc@a.com"
          className="flex-1"
          errorMessage={errors.email?.message}
          maxLength={20}
          {...register('email')}
        />
        <Button className="mt-auto h-[44px] rounded-3xl">인증요청</Button>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="verifyCode"
          className="font-semibold text-[13px] text-gray-3 ms-1"
        >
          인증번호
        </label>
        <div className="relative w-full">
          <Input
            type="text"
            id="verifyCode"
            placeholder="인증번호 6자리"
            className="pr-16"
            maxLength={6}
            {...register('verifyCode')}
          />
          <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-2">
            03:00
          </span>
        </div>
      </div>
      <CommonButton onClick={onNext} className="mt-6">
        다음
      </CommonButton>
    </section>
  );
}
