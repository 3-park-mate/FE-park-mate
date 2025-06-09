'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../base/alert-dialog';

export default function AlertModal({
  open,
  onOpenChange,
  onConfirm,
  errorMessage,
  isPreLine = false,
  showCancelButton = false,
  theme = 'primary',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  errorMessage?: string;
  isPreLine?: boolean;
  showCancelButton?: boolean;
  theme?: 'primary' | 'secondary';
}) {
  const confirmBtnClass =
    theme === 'primary'
      ? 'w-fit py-3 px-6 bg-primary-dark text-white'
      : 'w-fit py-3 px-6 bg-secondary text-white';

  const cancelBtnClass =
    theme === 'primary'
      ? 'w-fit py-3 px-6 text-primary bg-white border border-primary'
      : 'w-fit py-3 px-6 text-secondary bg-white border border-secondary hover:text-secondary';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">알림</AlertDialogTitle>
          <AlertDialogDescription
            className={`text-left break-keep ${isPreLine ? 'whitespace-pre-line' : ''}`}
          >
            {errorMessage ?? '알 수 없는 오류가 발생했습니다.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end gap-2 p-0">
          <AlertDialogAction onClick={onConfirm} className={confirmBtnClass}>
            확인
          </AlertDialogAction>
          {showCancelButton && (
            <AlertDialogCancel
              onClick={() => onOpenChange(false)}
              className={cancelBtnClass}
            >
              취소
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
