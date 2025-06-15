'use client';

import { useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { SignUpStoreDataType } from '@/types/authDataTypes';

import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import {
  CommonButton,
  FormHeading,
} from '@repo/ui/components/common/CommonLayouts';
import {
  checkEmailDuplicateAction,
  sendEmailVerificationAction,
  verifyEmailCodeAction,
} from '@/actions/auth/auth-service';
import AlertModal from '@repo/ui/components/common/AlertModal';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';

export default function EmailVerifyStep({ onNext }: { onNext?: () => void }) {
  const { register, getValues } = useFormContext<SignUpStoreDataType>();
  const { errors } = useFormState<SignUpStoreDataType>();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();

  const checkEmailDuplicate = async (email: string) => {
    const res = await checkEmailDuplicateAction({ email });

    if (!res.success) {
      handleAlert(res.message);
      return false;
    }

    if (res.data.duplicate) {
      handleAlert(
        '이미 등록된 이메일입니다. 다른 이메일로 다시 시도해 주세요.'
      );
      return false;
    }

    return true;
  };

  const handleSendVerificationCode = async () => {
    setLoading(true);
    const email = getValues('email');

    const isAvailable = await checkEmailDuplicate(email);
    if (!isAvailable) return;

    const sendRes = await sendEmailVerificationAction({ email });
    if (!sendRes.success) return handleAlert(sendRes.message);

    setIsCodeSent(true);
    handleAlert('인증 코드가 전송되었습니다.');
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    const email = getValues('email');
    const code = getValues('verifyCode');

    const res = await verifyEmailCodeAction({ email, verificationCode: code });

    if (!res.success) return handleAlert(res.message);
    if (!res.data.valid)
      return handleAlert('인증번호가 틀렸습니다. 다시 시도해 주세요.');

    setIsVerified(true);
    handleAlert('인증이 완료되었습니다.');
  };

  return (
    <section className="space-y-5">
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
      />
      <FormHeading>이메일 인증을 해주세요.</FormHeading>
      <div className="flex gap-2">
        <CommonInputWithLabel
          label="이메일 주소"
          id="email"
          placeholder="abc@a.com"
          className="flex-1"
          errorMessage={errors.email?.message}
          maxLength={40}
          readOnly={loading || isCodeSent}
          {...register('email')}
        />
        <Button
          type="button"
          className="mt-6 h-[44px] rounded-3xl w-[80px]"
          onClick={handleSendVerificationCode}
          disabled={loading || isCodeSent}
        >
          {!isCodeSent && loading ? <DotSpinner /> : '인증요청'}
        </Button>
      </div>
      {isCodeSent && (
        <div className="grid w-full items-center gap-1.5">
          <label
            htmlFor="verifyCode"
            className="font-semibold text-13px text-gray-3 ms-1"
          >
            인증번호
          </label>
          <div className="relative w-full">
            <Input
              type="text"
              id="verifyCode"
              placeholder="인증번호 6자리"
              className="pr-20"
              maxLength={6}
              readOnly={loading || isVerified}
              {...register('verifyCode')}
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-2">
              03:00
            </span>
          </div>
          <CommonButton
            className="mt-3"
            onClick={handleVerifyCode}
            disabled={loading || isVerified}
            type="button"
          >
            {loading ? <DotSpinner /> : '인증번호 확인'}
          </CommonButton>
          <ul className="text-gray-2 text-sm mt-4 break-keep">
            <li>
              • 인증 번호 메일이 오지 않을 시, 스팸 메일함을 확인해 주세요.
            </li>
            <li>• 입력 5회 실패 시 인증 번호 메일을 재요청 해주세요.</li>
            <li className="ml-2.5">
              <button
                type="button"
                className="text-secondary text-sm underline cursor-pointer"
              >
                인증번호 다시 요청
              </button>
            </li>
          </ul>
        </div>
      )}
      <CommonButton onClick={onNext} className="mt-10" disabled={!isVerified}>
        다음
      </CommonButton>
    </section>
  );
}
