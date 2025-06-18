'use client';
import { useFunnel } from '@/hooks/useFunnel';
import ParkingLotInfoStep from './step/ParkingLotInfoStep';
import EvSpotSetupStep from './step/EvSpotSetupStep';
import ParkingLotImagesStep from './step/ParkingLotImagesStep';
import ParkingSpotSetupStep from './step/ParkingSpotSetupStep';
import {
  AddParkingLotDataType,
  AddParkingLotStoreDataType,
} from '@/types/addParkingLotDataTypes';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addParkingLotSchema } from '@/schemas/addParkingLotSchema';
import { handleKeyDown } from '@/utils/formUtils';
import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import ParkingLotOptionStep from './step/ParkingLotOptionStep';
import { addParkingLotAction } from '@/actions/parking/parking-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { uploadFileToS3 } from '@/actions/common/s3-service';

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
        hostUuid: 'hostuuid-dummy',
        parkingLotType: 'PRIVATE',
        name: '',
        phoneNumber: '01012344321',
        capacity: 0,
        registeredCapacity: 0,
        mainAddress: '',
        detailAddress: '',
        latitude: 0,
        longitude: 0,
        isEvChargingAvailable: false,
        extraInfo: '',
      },
      optionIds: [],
      parkingSpot: {
        chargeable: [],
        nonChargeable: [
          { parkingSpotType: 'SMALL', count: 0 },
          { parkingSpotType: 'COMPACT', count: 0 },
          { parkingSpotType: 'STANDARD', count: 0 },
          { parkingSpotType: 'LARGE', count: 0 },
        ],
      },
      parkingLotImage: {
        images: [],
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
        methods.setValue('parkingLot.isEvChargingAvailable', !skipEvStep);

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
    [_setStep, router, searchParams, methods]
  );
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();
  const { handleSubmit } = methods;
  const onSubmit = async (data: AddParkingLotStoreDataType) => {
    setLoading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of data.parkingLotImage.images) {
        const url = await uploadFileToS3(
          file,
          'parkingLot',
          data.parkingLot.hostUuid
        );
        uploadedUrls.push(url);
      }
      console.log('uploadedUrls: ', uploadedUrls);

      const submitData: AddParkingLotDataType = {
        ...data,
        parkingLot: {
          ...data.parkingLot,
          thumbnailUrl: uploadedUrls[0] ?? '',
        },
        parkingLotImage: {
          imageUrls: uploadedUrls.map((url) => ({ imageUrl: url })),
        },
      };
      console.log('submitData: ', submitData);

      const res = await addParkingLotAction(submitData);

      if (!res.success) return handleAlert(res.message);
      handleAlert('주차장 등록이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      handleAlert('알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const { watch } = methods;
  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     console.log('💡 변경된 필드:', name);
  //     console.log('📋 변경 타입:', type);
  //     console.log('📝 현재 값:', value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const isParkingSpotRelated =
        name?.startsWith('parkingSpot.chargeable') ||
        name?.startsWith('parkingSpot.nonChargeable');

      if (!isParkingSpotRelated) return;

      const chargeableCount = value.parkingSpot?.chargeable?.length ?? 0;
      const nonChargeableCount = (
        value.parkingSpot?.nonChargeable ?? []
      ).reduce((sum, spot) => sum + (spot?.count || 0), 0);

      const total = chargeableCount + nonChargeableCount;

      methods.setValue('parkingLot.capacity', total);
      methods.setValue('parkingLot.registeredCapacity', total);
    });

    return () => subscription.unsubscribe();
  }, [watch, methods]);

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={() => {
          router.push('/');
        }}
        theme="secondary"
      />
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
                loading={loading}
              />
            </Funnel.step>
          </Funnel>
        </form>
      </FormProvider>
    </>
  );
}
