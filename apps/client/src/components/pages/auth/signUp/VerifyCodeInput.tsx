import { SignUpStoreDataType } from '@/types/authDataTypes';
import { Input } from '@repo/ui/components/base/input';
import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useFormContext, useFormState } from 'react-hook-form';

interface EmailVerificationCodeInputProps {
  timeLeft: number;
  loading: boolean;
  isVerified: boolean;
  onVerifyCode: () => void;
  onResendCode?: () => void;
}

export default function VerifyCodeInput({
  timeLeft,
  loading,
  isVerified,
  onVerifyCode,
  onResendCode,
}: EmailVerificationCodeInputProps) {
  const { register, getValues } = useFormContext<SignUpStoreDataType>();
  const { errors } = useFormState<SignUpStoreDataType>();
  const code = getValues('verificationCode') || '';
  const isVerificationCodeValid = code.length === 6 && !errors.verificationCode;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="grid w-full items-center gap-1.5">
      <label
        htmlFor="verificationCode"
        className="font-semibold text-13px text-gray-3 ms-1"
      >
        인증번호
      </label>
      <div className="relative w-full">
        <Input
          type="text"
          id="verificationCode"
          placeholder="인증번호 6자리"
          className="pr-20"
          maxLength={6}
          readOnly={loading || isVerified}
          {...register('verificationCode')}
        />
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-2">
          {`${minutes}:${seconds}`}
        </span>
      </div>
      <CommonButton
        className="mt-3"
        onClick={onVerifyCode}
        disabled={loading || isVerified || !isVerificationCodeValid}
        type="button"
      >
        {loading ? <DotSpinner /> : '인증번호 확인'}
      </CommonButton>
      <ul className="text-gray-2 text-sm mt-4 break-keep">
        <li>• 인증 번호 메일이 오지 않을 시, 스팸 메일함을 확인해 주세요.</li>
        <li>• 입력 5회 실패 시 인증 번호 메일을 재요청 해주세요.</li>
        <li className="ml-2.5">
          <button
            type="button"
            onClick={onResendCode}
            className="text-secondary text-sm underline cursor-pointer"
          >
            인증번호 다시 요청
          </button>
        </li>
      </ul>
    </div>
  );
}
