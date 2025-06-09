'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { Address } from 'react-daum-postcode';
import DaumPostcodeModal from './DaumPostcodeModal';

export default function AddressSearchField() {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

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
        />
        <Button
          type="button"
          className="mt-auto h-[44px] rounded-3xl bg-secondary"
          onClick={() => setIsPostcodeOpen(true)}
        >
          주소찾기
        </Button>
      </div>
      <CommonInputWithLabel
        id="zoncode"
        placeholder="우편번호"
        value={zonecode}
        maxLength={10}
        readOnly
      />
      <CommonInputWithLabel
        label="상세주소"
        id="detailAddress"
        placeholder="상세주소를 작성해 주세요. (ex. A동 1층)"
        maxLength={40}
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
    </>
  );
}
