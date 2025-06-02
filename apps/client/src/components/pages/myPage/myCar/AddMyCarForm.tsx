'use client';
import { addMyCarSchema } from '@/schemas/addMyCarSchema';
import { AddMyCarDataType } from '@/types/myPageDataTypes';
import { handleKeyDown } from '@/utils/formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';

export default function AddMyCarForm() {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { register, handleSubmit, control } = useForm<AddMyCarDataType>({
    resolver: zodResolver(addMyCarSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      vehicleNumber: '',
      nickname: '',
      isDefault: false,
    },
  });
  const { errors, isValid } = useFormState({
    control,
  });

  const onSubmit = (data: AddMyCarDataType) => {
    console.log('차량 등록 데이터:', data);
    setModalMessage(`등록되었습니다.`);
    setAlertModalOpen(true);
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
      />
      <form
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 px-6"
      >
        <h1 className="text-2xl font-semibold pt-10 pb-5">
          차량 정보를 입력해 주세요.
        </h1>
        <CommonInputWithLabel
          label="차량 번호"
          id="vehicleNumber"
          placeholder="12가3456"
          errorMessage={errors.vehicleNumber?.message}
          maxLength={8}
          {...register('vehicleNumber')}
        />
        <CommonInputWithLabel
          label="차량 별명"
          id="nickname"
          placeholder="회사 차량"
          errorMessage={errors.nickname?.message}
          maxLength={10}
          {...register('nickname')}
        />
        <CommonButton disabled={!isValid} type="submit" className="mt-3">
          차량 등록
        </CommonButton>
      </form>
    </>
  );
}
