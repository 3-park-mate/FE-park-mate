'use client';
import { EditUserInfoData } from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { editProfileSchema } from '@/schemas/editProfileSchema';
import { EditProfileDataType, UserInfoDataType } from '@/types/userDataTypes';
import { formatPhoneNumber, handleKeyDown } from '@/utils/formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import EditFormButtons from '@repo/ui/components/common/EditFormButtons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditProfileForm({
  userData,
}: {
  userData: UserInfoDataType;
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<EditProfileDataType>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: userData.name || '',
      phoneNumber: formatPhoneNumber(userData.phoneNumber || ''),
    },
  });

  const onSubmit = async (data: EditProfileDataType) => {
    setLoading(true);
    const editProfileData: EditProfileDataType = {
      name: data.name,
      phoneNumber: data.phoneNumber.replace(/-/g, ''),
    };
    console.log('data: ', editProfileData);

    const res = await EditUserInfoData(editProfileData);
    if (!res.success) return handleAlert(res.message);

    handleAlert('유저 정보가 정상적으로 변경되었습니다.');
    setIsEditing(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    const inputType =
      e.nativeEvent instanceof InputEvent ? e.nativeEvent.inputType : undefined;

    const newFormattedValue = formatPhoneNumber(
      value,
      inputType,
      selectionStart ?? value.length
    );

    setValue('phoneNumber', newFormattedValue);
  };

  return (
    <PaddedSection className="py-7">
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
      />
      <form
        className="space-y-5"
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CommonInputWithLabel
          label="이름"
          id="name"
          placeholder="홍길동"
          maxLength={10}
          readOnly={loading || !isEditing}
          {...register('name')}
        />
        <CommonInputWithLabel
          label="전화번호"
          id="phoneNumber"
          placeholder="010-1234-5678"
          maxLength={13}
          readOnly={loading || !isEditing}
          {...register('phoneNumber', { onChange: handlePhoneNumberChange })}
        />
        <EditFormButtons
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          loading={loading}
          isValid={isValid}
        />
      </form>
    </PaddedSection>
  );
}
