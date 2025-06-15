'use client';
import { HeadingWithDesc } from '@repo/ui/components/common/CommonLayouts';
import SpotCountSelectSection from '../SpotCountSelectSection';
import { StepButtons } from '@repo/ui/components/common/StepButtons';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { NonChargeableParkingSpot } from '@/types/addParkingLotDataTypes';
import { nonChargeableParkingSpotSchema } from '@/schemas/addParkingLotSchema';
import AlertModal from '@repo/ui/components/common/AlertModal';

export default function ParkingSpotSetupStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { getValues } = useFormContext();
  const [openAlert, setOpenAlert] = useState(false);

  const handleNextClick = () => {
    const nonChargeableSpots = getValues('parkingSpot.nonChargeable') || [];

    const hasInvalid = nonChargeableSpots.some(
      (spot: NonChargeableParkingSpot) => {
        try {
          nonChargeableParkingSpotSchema.parse(spot);
          return false;
        } catch {
          return true;
        }
      }
    );
    const allZero =
      nonChargeableSpots.length > 0 &&
      nonChargeableSpots.every(
        (spot: NonChargeableParkingSpot) => (spot.count ?? 0) === 0
      );
    if (hasInvalid || allZero) {
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
        errorMessage="최소 하나의 주차면을 설정해주세요."
        theme="secondary"
      />
      <section className="space-y-5">
        <HeadingWithDesc
          heading="수용 가능한 차량 종류에 따른 주차면수를 입력해 주세요."
          subHeading="각각 주차면의 면적을 확인하시고, 최대로 수용 가능한 차량 종류에 따라 주차면수를 작성해 주세요."
        />
        <SpotCountSelectSection />
        <StepButtons onBack={onBack} onNext={handleNextClick} />
      </section>
    </>
  );
}
