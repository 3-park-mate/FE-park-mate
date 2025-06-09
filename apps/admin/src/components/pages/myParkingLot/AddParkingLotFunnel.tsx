'use client';
import { useFunnel } from '@/hooks/useFunnel';
import ParkingLotInfoStep from './step/ParkingLotInfoStep';
import EvSpotSetupStep from './step/EvSpotSetupStep';
import ParkingLotImagesStep from './step/ParkingLotImagesStep';
import ParkingSpotSetupStep from './step/ParkingSpotSetupStep';

export default function AddParkingLotFunnel() {
  const [Funnel, _setStep] = useFunnel<'step1' | 'step2' | 'step3' | 'step4'>(
    'step1'
  );

  const setStep = (step: 'step1' | 'step2' | 'step3' | 'step4') => {
    _setStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // <FormProvider {...methods}>
    <form className="px-5">
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
            onNext={() => setStep('step1')}
            onBack={() => setStep('step3')}
          />
        </Funnel.step>
      </Funnel>
    </form>
    // </FormProvider>
  );
}
