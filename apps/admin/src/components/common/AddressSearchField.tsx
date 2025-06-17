'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { Address } from 'react-daum-postcode';
import DaumPostcodeModal from './DaumPostcodeModal';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';
import { fetchCoordsFromAddress } from '@/utils/geolocation';

export default function AddressSearchField() {
  const { register, setValue, control } =
    useFormContext<AddParkingLotStoreDataType>();
  const { errors, touchedFields } = useFormState<AddParkingLotStoreDataType>();
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const mainAddress = useWatch({
    control,
    name: 'parkingLot.mainAddress',
    defaultValue: '',
  });

  const handleComplete = async (data: Address) => {
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

    setValue('parkingLot.mainAddress', fullAddress, { shouldValidate: true });

    const coords = await fetchCoordsFromAddress(fullAddress);

    setValue('parkingLot.latitude', coords.latitude, { shouldValidate: true });
    setValue('parkingLot.longitude', coords.longitude, {
      shouldValidate: true,
    });

    setIsPostcodeOpen(false);
  };

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
          errorMessage={
            touchedFields?.parkingLot?.mainAddress
              ? errors.parkingLot?.mainAddress?.message
              : undefined
          }
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
        label="상세주소"
        id="detailAddress"
        placeholder="상세주소를 작성해 주세요. (ex. A동 1층)"
        maxLength={40}
        errorMessage={
          touchedFields?.parkingLot?.detailAddress
            ? errors.parkingLot?.detailAddress?.message
            : undefined
        }
        {...register('parkingLot.detailAddress')}
      />
    </>
  );
}
