'use client';

import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { signInSchema } from '@/schemas/signInSchema';
import { SignInDataType } from '@/types/authDataTypes';
import { handleKeyDown } from '@/utils/formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/base/button';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import PasswordInputWithLabel from '@repo/ui/components/common/PasswordInputWithLabel';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function SignInForm() {
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

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
    setLoading(true);
    console.log('로그인 데이터:', data);
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl,
        redirect: false,
      });
      console.log(res);

      if (res?.ok) {
        router.push(res.url ?? '/');
      } else {
        const message =
          res?.error ??
          '로그인 중 알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
        handleAlert(message);
      }
    } catch (_error) {
      setLoading(false);
    }
  };

  return (
    <PaddedLayout className="w-full">
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        theme="secondary"
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
          readOnly={loading}
          {...register('email')}
        />
        <PasswordInputWithLabel
          label="비밀번호"
          id="password"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          maxLength={20}
          readOnly={loading}
          {...register('password')}
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={!isValid}
          className="w-full h-10 rounded-2xl mt-3"
        >
          {loading ? <DotSpinner /> : '로그인'}
        </Button>
      </form>
    </PaddedLayout>
  );
}
