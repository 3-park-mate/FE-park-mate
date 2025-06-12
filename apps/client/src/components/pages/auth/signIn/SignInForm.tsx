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
import { signIn } from 'next-auth/react';
import PasswordInputWithLabel from '@repo/ui/components/common/PasswordInputWithLabel';
import OauthLoginButton from './OauthLoginButton';
import { useState } from 'react';
import AlertModal from '@repo/ui/components/common/AlertModal';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');

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

  const onSubmit = async (data: SignInDataType) => {
    setIsLoading(true);
    console.log('로그인 데이터:', data);
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        // callbackUrl: '/',
        redirect: false,
      });
      console.log(res);
      if (!res?.ok) {
        {
          const message =
            res?.error ??
            '로그인 중 알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
          setModalErrorMessage(message);
          setErrorModalOpen(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PaddedLayout className="w-full">
      <AlertModal
        open={errorModalOpen}
        onOpenChange={setErrorModalOpen}
        errorMessage={modalErrorMessage}
      />
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
        <PasswordInputWithLabel
          label="비밀번호"
          id="password"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          maxLength={20}
          {...register('password')}
        />
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full h-10 rounded-2xl mt-3"
        >
          {isLoading ? '로딩중...' : '로그인'}
        </Button>
      </form>
      <OauthLoginButton />
      <ToggleWelcomeSheet />
    </PaddedLayout>
  );
}
