'use client';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import EvSpotSetupSection from '../EvSpotSetupSection';
import ChargingTypeGuide from '../ChargingTypeGuide';
import { StepButtons } from '../StepButtons';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { chargeableParkingSpotSchema } from '@/schemas/addParkingLotSchema';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { ChargeableParkingSpot } from '@/types/addParkingLotDataTypes';

export default function EvSpotSetupStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { getValues } = useFormContext();
  const [openAlert, setOpenAlert] = useState(false);

  const handleNextClick = () => {
    const parkingSpots = getValues('parkingSpot.chargeable') || [];

    const hasInvalid = parkingSpots.some((spot: ChargeableParkingSpot) => {
      try {
        chargeableParkingSpotSchema.parse(spot);
        return false;
      } catch {
        return true;
      }
    });
    if (hasInvalid) {
      setOpenAlert(true);
      return;
    }
    onNext();
  };

  return (
    <>
      <AlertModal
        open={openAlert}
        onOpenChange={setOpenAlert}
        onConfirm={() => setOpenAlert(false)}
        errorMessage="각 주차면당 최소 하나의 충전 방식을 선택해주세요."
        theme="secondary"
      />
      <section className="space-y-5">
        <HeadingWithDesc
          heading="전기차 충전이 가능한 주차면을 설정해 주세요."
          subHeading="각 주차면 충전기의 커넥터 타입을 확인하시고, 가능한 충전 타입을 모두 선택해 주세요."
        />
        <ChargingTypeGuide />
        <EvSpotSetupSection />
        <StepButtons onBack={onBack} onNext={handleNextClick} />
      </section>
    </>
  );
}
