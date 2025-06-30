'use client';
import { addUserVehicleAction } from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import { addMyCarSchema } from '@/schemas/addMyCarSchema';
import { UserVehicleDataType } from '@/types/userDataTypes';
import { handleKeyDown } from '@/utils/formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  FormHeading,
} from '@repo/ui/components/common/CommonLayouts';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CommonCheckbox } from '@repo/ui/components/common/CommonCheckbox';

export default function AddMyCarForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();
  const { register, handleSubmit, control, setValue } =
    useForm<UserVehicleDataType>({
      resolver: zodResolver(addMyCarSchema),
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        vehicleNumber: '',
        nickname: '',
        defaultSelected: false,
      },
    });
  const { errors, isValid } = useFormState({
    control,
  });

  const onSubmit = async (userVehicleData: UserVehicleDataType) => {
    setLoading(true);
    console.log('data: ', userVehicleData);
    const res = await addUserVehicleAction(userVehicleData);
    if (!res.success) return handleAlert(res.message);
    handleAlert('차량이 등록되었습니다.');
    setLoading(false);
    setIsSuccess(true);
  };

  const handleDefaultSelectedChange = (checked: boolean) => {
    setValue('defaultSelected', checked);
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={
          isSuccess
            ? () => {
                router.push('/my-car');
              }
            : undefined
        }
      />
      <form
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-6"
      >
        <FormHeading>차량 정보를 입력해 주세요.</FormHeading>
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
        <div className="flex items-center space-x-2 ps-1">
          <CommonCheckbox
            id="defaultSelected"
            theme="primary"
            {...register('defaultSelected')}
            onCheckedChange={handleDefaultSelectedChange}
          />
          <label htmlFor="defaultSelected" className="text-sm text-gray-800">
            기본 차량으로 설정
          </label>
        </div>
        <CommonButton
          disabled={!isValid || loading}
          type="submit"
          className="mt-3"
        >
          {loading ? <DotSpinner /> : '차량 등록'}
        </CommonButton>
      </form>
    </>
  );
}
