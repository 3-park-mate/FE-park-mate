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
import EmailVerifyStep from './step/EmailVerifyStep';
import PasswordStep from './step/PasswordStep';
import UserInfoStep from './step/UserInfoStep';
import HostInfoStep from './step/HostInfoStep';

export type SignUpStep = 'step1' | 'step2' | 'step3' | 'step4';

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
      bankName: '',
      accountNumber: '',
      businessRegistrationNumber: '',
      settlementCycle: 15,
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
      bankName,
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
      bankName,
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
        theme="secondary"
      />
      <FormProvider {...methods}>
        <form className="px-5" onKeyDown={handleKeyDown}>
          <Funnel>
            <Funnel.step name="step1">
              <EmailVerifyStep onNext={() => setStep('step2')} />
            </Funnel.step>
            <Funnel.step name="step2">
              <PasswordStep
                onNext={() => setStep('step3')}
                onBack={() => setStep('step1')}
              />
            </Funnel.step>
            <Funnel.step name="step3">
              <UserInfoStep
                onNext={() => setStep('step4')}
                onBack={() => setStep('step2')}
              />
            </Funnel.step>
            <Funnel.step name="step4">
              <HostInfoStep
                onNext={handleSubmit(onSubmit)}
                onBack={() => setStep('step3')}
              />
            </Funnel.step>
          </Funnel>
        </form>
      </FormProvider>
    </>
  );
}
