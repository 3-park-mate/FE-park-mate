'use client';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { handleKeyDown } from '@/utils/formUtils';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import CommonTextArea from '@repo/ui/components/common/CommonTextArea';
import EditFormButtons from '@repo/ui/components/common/EditFormButtons';
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
    <PaddedSection className="bg-white rounded-xl py-6">
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
      />
      <h2 className="text-lg font-semibold">주차장 정보</h2>
      <p className="mb-4 text-gray-2 text-sm break-keep">
        사용자에게 보여지는 주차장 기본 정보입니다.
      </p>
      <form className="space-y-5" onKeyDown={handleKeyDown}>
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
    </PaddedSection>
  );
}
