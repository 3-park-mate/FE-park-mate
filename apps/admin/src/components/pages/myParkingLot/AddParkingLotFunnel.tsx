'use client';
import { useFunnel } from '@/hooks/useFunnel';
import ParkingLotInfoStep from './step/ParkingLotInfoStep';
import EvSpotSetupStep from './step/EvSpotSetupStep';
import ParkingLotImagesStep from './step/ParkingLotImagesStep';
import ParkingSpotSetupStep from './step/ParkingSpotSetupStep';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addParkingLotSchema } from '@/schemas/addParkingLotSchema';
import { handleKeyDown } from '@/utils/formUtils';

export default function AddParkingLotFunnel() {
  const methods = useForm<AddParkingLotStoreDataType>({
    resolver: zodResolver(addParkingLotSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      parkingLot: {
        name: '',
        zoneCode: '',
        mainAddress: '',
        detailAddress: '',
        extraInfo: '',
      },
    },
  });
  const [Funnel, _setStep] = useFunnel<'step1' | 'step2' | 'step3' | 'step4'>(
    'step1'
  );
  const setStep = (step: 'step1' | 'step2' | 'step3' | 'step4') => {
    _setStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { handleSubmit } = methods;
  const onSubmit = (data: AddParkingLotStoreDataType) => {
    console.log('SignUp Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form className="px-5" onKeyDown={handleKeyDown}>
        <Funnel>
          <Funnel.step name="step1">
            <ParkingLotInfoStep onNext={() => setStep('step2')} />
          </Funnel.step>
          <Funnel.step name="step2">
            <ParkingLotImagesStep
              onNext={() => setStep('step3')}
              onBack={() => setStep('step1')}
            />
          </Funnel.step>
          <Funnel.step name="step3">
            <EvSpotSetupStep
              onNext={() => setStep('step4')}
              onBack={() => setStep('step2')}
            />
          </Funnel.step>
          <Funnel.step name="step4">
            <ParkingSpotSetupStep
              onNext={handleSubmit(onSubmit)}
              onBack={() => setStep('step3')}
            />
          </Funnel.step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
