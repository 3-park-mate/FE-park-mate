'use client';
import AddressSearchField from '@/components/common/AddressSearchField';
import { PARKINGLOT_FIELDS } from '@/constants/addParkingFormFields';
import { useStepValidation } from '@/hooks/useStepValidation';
import { AddParkingLotDataType } from '@/types/addParkingLotDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import CommonTextArea from '@repo/ui/components/common/CommonTextArea';
import { useCallback } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

export default function ParkingLotInfoStep({
  onNext,
}: {
  onNext?: () => void;
}) {
  const { register } = useFormContext<AddParkingLotDataType>();
  const { errors, touchedFields } = useFormState<AddParkingLotDataType>();

  const { isStepValid, triggerValidation } =
    useStepValidation<AddParkingLotDataType>(PARKINGLOT_FIELDS);

  const handleNextClick = useCallback(async () => {
    const result = await triggerValidation();
    if (result) {
      onNext?.();
    }
  }, [onNext, triggerValidation]);

  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="주차장 정보를 작성해 주세요."
        subHeading="사용자에게 보여질 주차장 기본 정보를 입력하는 란입니다."
      />
      <CommonInputWithLabel
        label="주차장명"
        id="name"
        placeholder="주차장명을 작성해 주세요."
        errorMessage={
          touchedFields?.parkingLot?.name
            ? errors.parkingLot?.name?.message
            : undefined
        }
        maxLength={40}
        {...register('parkingLot.name')}
      />
      <AddressSearchField />
      <CommonTextArea
        label="기타 정보"
        id="extraInfo"
        placeholder="기본 정보 이외에 사용자에게 알릴 정보를 작성해 주세요. (최대 500자)"
        errorMessage={
          touchedFields?.parkingLot?.extraInfo
            ? errors.parkingLot?.extraInfo?.message
            : undefined
        }
        maxLength={500}
        {...register('parkingLot.extraInfo')}
      />
      <CommonButton
        onClick={onNext}
        // onClick={handleNextClick}
        // disabled={!isStepValid}
        className="mt-10 bg-secondary"
      >
        다음
      </CommonButton>
    </section>
  );
}
