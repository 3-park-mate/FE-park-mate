'use client';

import { CommonButton } from '@repo/ui/components/common/CommonLayouts';
import { Button } from '@repo/ui/components/base/button';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { cn } from '../../lib/utils';

type ThemeVariant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | null
  | undefined;

export default function EditFormButtons({
  isEditing,
  setIsEditing,
  loading,
  isValid,
  theme = 'default',
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  loading: boolean;
  isValid: boolean;
  theme?: ThemeVariant;
}) {
  const themeColorClass =
    {
      default: 'border-primary text-primary',
      secondary: 'border-secondary text-secondary',
      destructive: 'border-destructive text-destructive',
    }[theme as 'default' | 'secondary' | 'destructive'] ??
    'border-primary text-primary';

  if (isEditing) {
    return (
      <div className="space-y-3">
        <CommonButton
          type="submit"
          disabled={!isValid}
          variant={theme}
          className="mt-3"
        >
          {loading ? <DotSpinner /> : '입력 정보 저장하기'}
        </CommonButton>
        <CommonButton
          type="button"
          onClick={() => setIsEditing(false)}
          className={cn('bg-white border', themeColorClass)}
        >
          취소
        </CommonButton>
      </div>
    );
  }

  return (
    <Button
      type="button"
      onClick={() => setIsEditing(true)}
      variant={theme}
      className="w-full h-11 rounded-2xl mt-3"
    >
      정보 수정하기
    </Button>
  );
}
