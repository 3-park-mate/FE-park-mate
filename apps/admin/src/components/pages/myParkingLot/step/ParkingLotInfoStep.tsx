'use client';
import AddressSearchField from '@/components/common/AddressSearchField';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import CommonTextArea from '@repo/ui/components/common/CommonTextArea';
import { useFormContext, useFormState } from 'react-hook-form';

export default function EmailVerifyStep({ onNext }: { onNext?: () => void }) {
  const { register } = useFormContext<AddParkingLotStoreDataType>();
  const { errors } = useFormState<AddParkingLotStoreDataType>();

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
        errorMessage={errors.parkingLot?.name?.message}
        maxLength={40}
        {...register('parkingLot.name')}
      />
      <AddressSearchField />
      <CommonTextArea
        label="기타 정보"
        id="extraInfo"
        placeholder="기본 정보 이외에 사용자에게 알릴 정보를 작성해 주세요. (최대 500자)"
        errorMessage={errors.parkingLot?.extraInfo?.message}
        maxLength={500}
        {...register('parkingLot.extraInfo')}
      />
      <CommonButton onClick={onNext} className="mt-10 bg-secondary">
        다음
      </CommonButton>
    </section>
  );
}
