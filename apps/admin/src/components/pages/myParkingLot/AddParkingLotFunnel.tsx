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
import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import ParkingLotOptionStep from './step/ParkingLotOptionStep';

export type AddParkingLotStep = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';

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
        latitude: 0,
        longitude: 0,
        extraInfo: '',
      },
      optionIds: [],
      // parkingLotImage: {
      //   imageUrls: [],
      // },
      parkingLotImage: {
        imageUrls: [
          { imageUrl: 'https://dummyimage.com/155x102' },
          { imageUrl: 'https://dummyimage.com/155x102' },
        ],
      },
      parkingSpot: {
        chargeable: [
          {
            parkingSpotType: 'EV',
            evChargeTypes: [],
          },
        ],
        nonChargeable: [
          { parkingSpotType: 'SMALL', count: 0 },
          { parkingSpotType: 'COMPACT', count: 0 },
          { parkingSpotType: 'STANDARD', count: 0 },
          { parkingSpotType: 'LARGE', count: 0 },
        ],
      },
    },
  });
  const [Funnel, _setStep] = useFunnel<AddParkingLotStep>('step1');
  const setStep = useCallback(
    (step: AddParkingLotStep, skipEvStep?: boolean) => {
      _setStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const currentParams = new URLSearchParams(searchParams.toString());

      if (skipEvStep !== undefined) {
        const currentSkipEvStep = currentParams.get('skipEvStep');
        const newSkipEvStep = skipEvStep ? 'true' : null;

        if (currentSkipEvStep !== newSkipEvStep) {
          if (newSkipEvStep) {
            currentParams.set('skipEvStep', newSkipEvStep);
          } else {
            currentParams.delete('skipEvStep');
          }
          router.replace(`?${currentParams.toString()}`);
        }
      }
    },
    [_setStep, router, searchParams]
  );
  const { handleSubmit } = methods;
  const onSubmit = (data: AddParkingLotStoreDataType) => {
    console.log('SignUp Data:', data);
  };

  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('💡 변경된 필드:', name);
      console.log('📋 변경 타입:', type);
      console.log('📝 현재 값:', value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...methods}>
      <form className="px-5" onKeyDown={handleKeyDown}>
        <Funnel>
          <Funnel.step name="step1">
            <ParkingLotInfoStep onNext={() => setStep('step2')} />
          </Funnel.step>
          <Funnel.step name="step2">
            <ParkingLotOptionStep
              onNext={() => setStep('step3')}
              onBack={() => setStep('step1')}
            />
          </Funnel.step>
          <Funnel.step name="step3">
            <ParkingLotImagesStep setStep={setStep} />
          </Funnel.step>
          <Funnel.step name="step4">
            <EvSpotSetupStep
              onNext={() => setStep('step5', false)}
              onBack={() => setStep('step3', false)}
            />
          </Funnel.step>
          <Funnel.step name="step5">
            <ParkingSpotSetupStep
              onNext={handleSubmit(onSubmit)}
              onBack={() => {
                const skipEv = searchParams.get('skipEvStep');
                if (skipEv === 'true') {
                  setStep('step3', true);
                } else {
                  setStep('step4', false);
                }
              }}
            />
          </Funnel.step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
