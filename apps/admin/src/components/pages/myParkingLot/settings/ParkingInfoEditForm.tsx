'use client';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import CommonTextArea from '@repo/ui/components/common/CommonTextArea';
import EditFormButtons from '@repo/ui/components/common/EditFormButtons';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useState } from 'react';

export default function ParkingInfoEditForm({
  name,
  extraInfo,
}: {
  name: string;
  extraInfo: string;
}) {
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="bg-white rounded-xl px-4 pt-5 pb-7">
      <h2 className="text-lg font-semibold mb-3">정보</h2>
      <form className="space-y-5">
        <CommonInputWithLabel
          label="주차장명"
          id="name"
          placeholder="주차장명을 작성해 주세요."
          maxLength={40}
          defaultValue={name}
          readOnly={loading || !isEditing}
          //   {...register('name')}
        />
        <CommonTextArea
          label="기타 정보"
          id="extraInfo"
          placeholder="기본 정보 이외에 사용자에게 알릴 정보를 작성해 주세요. (최대 500자)"
          // errorMessage={
          //   touchedFields?.parkingLot?.extraInfo
          //     ? errors.parkingLot?.extraInfo?.message
          //     : undefined
          // }
          maxLength={500}
          defaultValue={extraInfo}
          readOnly={loading || !isEditing}
          // {...register('parkingLot.extraInfo')}
        />
        <EditFormButtons
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          loading={loading}
          isValid={true}
          theme="secondary"
        />
      </form>
    </section>
  );
}
