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
import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function AddParkingLotFunnel() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      parkingLotImage: {
        imageUrls: [''],
      },
    },
  });
  const [Funnel, _setStep] = useFunnel<'step1' | 'step2' | 'step3' | 'step4'>(
    'step1'
  );
  const setStep = useCallback(
    (step: 'step1' | 'step2' | 'step3' | 'step4', skipEvStep?: boolean) => {
      _setStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const currentParams = new URLSearchParams(searchParams.toString());
      if (skipEvStep !== undefined) {
        if (skipEvStep) {
          currentParams.set('skipEvStep', 'true');
        } else {
          currentParams.delete('skipEvStep');
        }
      }
      router.replace(`?${currentParams.toString()}`);
    },
    [_setStep, router, searchParams]
  );
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
            <ParkingLotImagesStep setStep={setStep} />
          </Funnel.step>
          <Funnel.step name="step3">
            <EvSpotSetupStep
              onNext={() => setStep('step4', false)}
              onBack={() => {
                setStep('step2', false);
              }}
            />
          </Funnel.step>
          <Funnel.step name="step4">
            <ParkingSpotSetupStep
              onNext={handleSubmit(onSubmit)}
              onBack={() => {
                const skipEv = searchParams.get('skipEvStep');
                if (skipEv === 'true') {
                  setStep('step2', true);
                } else {
                  setStep('step3', false);
                }
              }}
            />
          </Funnel.step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
