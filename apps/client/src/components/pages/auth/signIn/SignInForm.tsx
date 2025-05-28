'use client';
import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import ToggleWelcomeSheet from '../ToggleWelcomeSheet';
import { SignInDataType } from '@/types/authDataTypes';
import { useForm } from 'react-hook-form';
import { signInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleKeyDown } from '@/utils/formUtils';
import OauthLoginButton from './OauthLoginButton';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInDataType>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInDataType) => {
    console.log('로그인 데이터:', data);
  };

  return (
    <PaddedLayout className="w-full">
      <form
        className="space-y-5"
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CommonInputWithLabel
          label="이메일 주소"
          id="email"
          placeholder="abc@a.com"
          maxLength={20}
          {...register('email')}
        />
        <CommonInputWithLabel
          label="비밀번호"
          id="password"
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          maxLength={20}
          {...register('password')}
        />
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full h-10 rounded-2xl mt-3"
        >
          로그인
        </Button>
      </form>
      <OauthLoginButton />
      <ToggleWelcomeSheet />
    </PaddedLayout>
  );
}
