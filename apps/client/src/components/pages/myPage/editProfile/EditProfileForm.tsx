'use client';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { editProfileSchema } from '@/schemas/editProfileSchema';
import { EditProfileDataType } from '@/types/userDataTypes';
import { handleKeyDown } from '@/utils/formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import EditFormButtons from '@repo/ui/components/common/EditFormButtons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditProfileForm() {
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
    handleSubmit,
    formState: { isValid },
  } = useForm<EditProfileDataType>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '홍길동',
      phoneNumber: '010-1234-5678',
    },
  });

  const onSubmit = async (data: EditProfileDataType) => {
    setLoading(true);
    console.log('로그인 데이터:', data);
    // try {
    //   const res = await signIn('credentials', {
    //     email: data.email,
    //     password: data.password,
    //     // callbackUrl: '/',
    //     redirect: false,
    //   });
    //   console.log(res);

    //   if (res?.ok) {
    //     router.push(res.url ?? '/');
    //   } else {
    //     const message =
    //       res?.error ??
    //       '로그인 중 알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
    //     setModalErrorMessage(message);
    //     setErrorModalOpen(true);
    //     setIsLoading(false);
    //   }
    //   router.push('/');
    // } catch (error) {
    //   setIsLoading(false);
    // }
    handleAlert('유저 정보가 정상적으로 변경되었습니다.');
    setIsEditing(false);
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
          {...register('phoneNumber')}
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
