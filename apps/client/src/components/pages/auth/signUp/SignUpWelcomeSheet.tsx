import { buttonVariants } from '@repo/ui/components/base/button';
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import Link from 'next/link';

export default function SignUpWelcomeSheet() {
  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-inner-background-yellow rounded-t-2xl px-5 pt-8 pb-30 max-w-[600px]"
    >
      <SheetTitle />
      <SheetDescription />
      <h1 className="font-extrabold text-3xl">
        파크메이트가
        <br />
        최적의 조건의 주차장을
        <br />
        실시간 안내해 드립니다.
      </h1>
      <Link
        href="/sign-up"
        className={`${buttonVariants({ variant: 'default' })} w-full h-11 rounded-2xl bg-secondary mt-4`}
      >
        회원가입
      </Link>
      <div className="flex gap-1 justify-center text-[13px] mt-2">
        <p className="text-gray-2">이미 파크메이트 계정이 있으신가요?</p>
        <Link href="sign-in" className="font-semibold text-secondary">
          로그인하기
        </Link>
      </div>
    </SheetContent>
  );
}
