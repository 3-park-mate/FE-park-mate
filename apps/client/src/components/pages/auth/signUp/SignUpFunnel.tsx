'use client';
import { useFunnel } from '@/hooks/useFunnel';
import { useForm, FormProvider } from 'react-hook-form';
import EmailVerifyStep from './step/EmailVerifyStep';
import PasswordStep from './step/PasswordStep';
import UserInfoStep from './step/UserInfoStep';
import { SignUpStoreDataType } from '@/types/storeDataTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpFunnel() {
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
  const [Funnel, setStep] = useFunnel<'step1' | 'step2' | 'step3'>('step1');
  const { handleSubmit } = methods;
  const onSubmit = (data: SignUpStoreDataType) => {
    console.log('Form Data:', data);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
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
  );
}
