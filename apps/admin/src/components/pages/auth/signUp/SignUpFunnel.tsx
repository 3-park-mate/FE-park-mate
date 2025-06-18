'use client';
import { useFunnel } from '@/hooks/useFunnel';
import { useForm, FormProvider } from 'react-hook-form';

import { SignUpDataType, SignUpStoreDataType } from '@/types/authDataTypes';
import { zodResolver } from '@hookform/resolvers/zod';

import { handleKeyDown } from '@/utils/formUtils';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { signUpAction } from '@/actions/auth/auth-service';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUpSchema } from '@/schemas/signUpSchema';

export type SignUpStep = 'step1' | 'step2' | 'step3';

export default function SignUpFunnel() {
  const router = useRouter();
  const methods = useForm<SignUpStoreDataType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      verificationCode: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      accountNumber: '',
      businessRegistrationNumber: '',
      settlementCycle: 0,
    },
  });
  const [Funnel, setStep] = useFunnel<SignUpStep>('step1');
  const [isSuccess, setIsSuccess] = useState(false);
  const { alertModalOpen, setAlertModalOpen, modalMessage, handleAlert } =
    useAlertWithLoading();
  const { handleSubmit } = methods;
  const onSubmit = async (data: SignUpStoreDataType) => {
    const {
      email,
      password,
      name,
      phoneNumber,
      verificationCode,
      accountNumber,
      businessRegistrationNumber,
      settlementCycle,
    } = data;
    const signUpData: SignUpDataType = {
      email,
      password,
      name,
      phoneNumber: phoneNumber.replace(/-/g, ''),
      verificationCode,
      accountNumber,
      businessRegistrationNumber,
      settlementCycle,
    };
    console.log('SignUp Data:', signUpData);
    const res = await signUpAction(signUpData);

    if (!res.success) return handleAlert(res.message);
    setIsSuccess(true);
    handleAlert('회원가입이 완료되었습니다. 입력한 정보로 로그인 해주세요.');
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={() => {
          if (isSuccess) router.push('/sign-in');
        }}
      />
      <FormProvider {...methods}>
        <form className="px-5" onKeyDown={handleKeyDown}>
          <Funnel>
            <Funnel.step name="step1">
              1{/* <EmailVerifyStep onNext={() => setStep('step2')} /> */}
            </Funnel.step>
            <Funnel.step name="step2">
              2
              {/* <PasswordStep
                onNext={() => setStep('step3')}
                onBack={() => setStep('step1')}
              /> */}
            </Funnel.step>
            <Funnel.step name="step3">
              3
              {/* <UserInfoStep
                onNext={handleSubmit(onSubmit)}
                onBack={() => setStep('step2')}
              /> */}
            </Funnel.step>
          </Funnel>
        </form>
      </FormProvider>
    </>
  );
}
