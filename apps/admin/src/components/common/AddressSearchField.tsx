'use client';

import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { Address } from 'react-daum-postcode';
import DaumPostcodeModal from './DaumPostcodeModal';
import { FieldErrors, UseFormRegister, useFormContext } from 'react-hook-form';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';

export default function AddressSearchField({
  register,
  errors,
}: {
  register: UseFormRegister<AddParkingLotStoreDataType>;
  errors: FieldErrors<AddParkingLotStoreDataType>;
}) {
  const { setValue } = useFormContext<AddParkingLotStoreDataType>();

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setMainAddress(fullAddress);
    setZonecode(data.zonecode);
    setValue('parkingLot.mainAddress', fullAddress, { shouldValidate: true });
    setValue('parkingLot.zoneCode', data.zonecode, { shouldValidate: true });
    setIsPostcodeOpen(false);
  };

  useEffect(() => {
    setValue('parkingLot.mainAddress', mainAddress);
  }, [mainAddress, setValue]);

  useEffect(() => {
    setValue('parkingLot.zoneCode', zonecode);
  }, [zonecode, setValue]);

  return (
    <>
      {isPostcodeOpen && (
        <DaumPostcodeModal
          onClose={() => setIsPostcodeOpen(false)}
          onComplete={handleComplete}
        />
      )}
      <div className="flex gap-2">
        <CommonInputWithLabel
          label="주소"
          id="mainAddress"
          placeholder="주소"
          value={mainAddress}
          readOnly
          errorMessage={errors.parkingLot?.mainAddress?.message}
          {...register('parkingLot.mainAddress')}
        />
        <Button
          type="button"
          className="mt-6 h-[44px] rounded-3xl bg-secondary"
          onClick={() => setIsPostcodeOpen(true)}
        >
          주소찾기
        </Button>
      </div>
      <CommonInputWithLabel
        id="zoneCode"
        placeholder="우편번호"
        value={zonecode}
        maxLength={10}
        readOnly
        errorMessage={errors.parkingLot?.zoneCode?.message}
        {...register('parkingLot.zoneCode')}
      />
      <CommonInputWithLabel
        label="상세주소"
        id="detailAddress"
        placeholder="상세주소를 작성해 주세요. (ex. A동 1층)"
        maxLength={40}
        errorMessage={errors.parkingLot?.detailAddress?.message}
        {...register('parkingLot.detailAddress')}
      />
    </>
  );
}
