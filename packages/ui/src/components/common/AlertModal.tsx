'use client';

import {
  AlertDialog,
  AlertDialogAction,
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
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  errorMessage?: string;
  isPreLine?: boolean;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">알림</AlertDialogTitle>
          <AlertDialogDescription
            className={`text-left  ${isPreLine && 'whitespace-pre-line'}`}
          >
            {errorMessage ?? '알 수 없는 오류가 발생했습니다.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="block text-right">
          <AlertDialogAction
            onClick={onConfirm}
            className="py-3 px-6 bg-primary-dark"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
