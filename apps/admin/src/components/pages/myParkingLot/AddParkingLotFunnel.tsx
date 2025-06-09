'use client';
import { useFunnel } from '@/hooks/useFunnel';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ParkingLotInfoStep from './step/ParkingLotInfoStep';
import EvSpotSetupStep from './step/EvSpotSetupStep';

export default function AddParkingLotFunnel() {
  //   const methods = useForm<SignUpStoreDataType>({
  //     resolver: zodResolver(signUpSchema),
  //     mode: 'onChange',
  //     reValidateMode: 'onChange',
  //     defaultValues: {
  //       email: '',
  //       verifyCode: '',
  //       name: '',
  //       phoneNumber: '',
  //       password: '',
  //       confirmPassword: '',
  //     },
  //   });
  const [Funnel, setStep] = useFunnel<'step1' | 'step2' | 'step3'>('step1');
  //   const { handleSubmit } = methods;
  //   const onSubmit = (data: SignUpStoreDataType) => {
  //     const { email, password, name, phoneNumber } = data;
  //     const signUpData: SignUpDataType = { email, password, name, phoneNumber };
  //     console.log('SignUp Data:', signUpData);
  //   };

  return (
    // <FormProvider {...methods}>
    <form className="px-5">
      <Funnel>
        <Funnel.step name="step1">
          <ParkingLotInfoStep onNext={() => setStep('step2')} />
        </Funnel.step>
        <Funnel.step name="step2">
          <EvSpotSetupStep onNext={() => setStep('step3')} />
        </Funnel.step>
      </Funnel>
    </form>
    // </FormProvider>
  );
}
