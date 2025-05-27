'use client';
import { useFunnel } from '@/hooks/useFunnel';
import { useForm, FormProvider } from 'react-hook-form';
import EmailVerifyStep from './step/EmailVerifyStep';
import PasswordStep from './step/PasswordStep';
import UserInfoStep from './step/UserInfoStep';
import { SignUpStoreDataType } from '@/types/storeDataTypes';
import SignUpWelcome from './step/SignUpWelcome';

export default function SignUpFunnel() {
  const methods = useForm<SignUpStoreDataType>({
    defaultValues: {
      email: '',
      verifyCode: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [Funnel, setStep] = useFunnel<'step1' | 'step2' | 'step3' | 'step4'>(
    'step1'
  );

  return (
    <FormProvider {...methods}>
      <form>
        <Funnel>
          <Funnel.step name="step1">
            <SignUpWelcome onNext={() => setStep('step2')} />
          </Funnel.step>
          <Funnel.step name="step2">
            <EmailVerifyStep onNext={() => setStep('step3')} />
          </Funnel.step>
          <Funnel.step name="step3">
            <PasswordStep
              onNext={() => setStep('step4')}
              onBack={() => setStep('step2')}
            />
          </Funnel.step>
          <Funnel.step name="step4">
            <UserInfoStep
              onNext={() => setStep('step1')}
              onBack={() => setStep('step3')}
            />
          </Funnel.step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
