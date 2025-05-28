import { Sheet, SheetTrigger } from '@repo/ui/components/base/sheet';
import SignUpWelcomeSheet from './signUp/SignUpWelcomeSheet';

export default function ToggleWelcomeSheet() {
  return (
    <Sheet key="bottom">
      <div className="flex gap-1 justify-center text-[13px] mt-4">
        <p className="text-gray-2">파크메이트 계정이 없으신가요?</p>
        <SheetTrigger asChild>
          <button className="font-semibold cursor-pointer">회원가입하기</button>
        </SheetTrigger>
      </div>
      <SignUpWelcomeSheet />
    </Sheet>
  );
}
