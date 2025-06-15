'use client';
import { useFunnel } from '@/hooks/useFunnel';
import { useForm, FormProvider } from 'react-hook-form';
import EmailVerifyStep from './step/EmailVerifyStep';
import PasswordStep from './step/PasswordStep';
import UserInfoStep from './step/UserInfoStep';
import { SignUpDataType, SignUpStoreDataType } from '@/types/authDataTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/signUpSchema';
import { handleKeyDown } from '@/utils/formUtils';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { signUpAction } from '@/actions/auth/auth-service';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useRouter } from 'next/navigation';

export type SignUpStep = 'step1' | 'step2' | 'step3';

export default function SignUpFunnel() {
  const router = useRouter();
  const methods = useForm<SignUpStoreDataType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      verifyCode: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [Funnel, setStep] = useFunnel<SignUpStep>('step1');
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();
  const { handleSubmit } = methods;
  const onSubmit = async (data: SignUpStoreDataType) => {
    const { email, password, name, phoneNumber, verifyCode } = data;
    const signUpData: SignUpDataType = {
      email,
      password,
      name,
      phoneNumber,
      verifyCode,
    };
    console.log('SignUp Data:', signUpData);
    const res = await signUpAction(signUpData);

    if (!res.success) return handleAlert(res.message);
    // handleAlert('회원가입이 완료되었습니다.');
    router.push('/sign-up/welcome');
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
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
                onNext={handleSubmit(onSubmit)}
                onBack={() => setStep('step2')}
              />
            </Funnel.step>
          </Funnel>
        </form>
      </FormProvider>
    </>
  );
}
