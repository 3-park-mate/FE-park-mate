'use client';

import { useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { SignUpStoreDataType } from '@/types/authDataTypes';
import { Button } from '@repo/ui/components/base/button';
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
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import VerifyCodeInput from '../VerifyCodeInput';

export default function EmailVerifyStep({ onNext }: { onNext?: () => void }) {
  const { register, getValues } = useFormContext<SignUpStoreDataType>();
  const { errors, touchedFields } = useFormState<SignUpStoreDataType>();

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
  const {
    timeLeft,
    start: startTimer,
    reset: resetTimer,
  } = useCountdownTimer(180, () => {
    setIsCodeSent(false);
    handleAlert('인증 시간이 만료되었습니다. 인증을 다시 요청해주세요.');
  });

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
    startTimer();
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    const email = getValues('email');
    const code = getValues('verificationCode');

    const res = await verifyEmailCodeAction({ email, verificationCode: code });

    if (!res.success) return handleAlert(res.message);
    if (!res.data.valid)
      return handleAlert('인증번호가 틀렸습니다. 다시 시도해 주세요.');

    setIsVerified(true);
    resetTimer();
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
          errorMessage={
            touchedFields?.email ? errors.email?.message : undefined
          }
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
        <VerifyCodeInput
          timeLeft={timeLeft}
          loading={loading}
          isVerified={isVerified}
          onVerifyCode={handleVerifyCode}
          onResendCode={handleSendVerificationCode}
        />
      )}
      <CommonButton onClick={onNext} className="mt-6" disabled={!isVerified}>
        다음
      </CommonButton>
    </section>
  );
}
