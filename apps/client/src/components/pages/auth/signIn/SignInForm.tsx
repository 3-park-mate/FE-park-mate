import { Button } from '@repo/ui/components/base/button';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';

export default function SignInForm() {
  return (
    <PaddedLayout className="w-full">
      <form className="space-y-5">
        <CommonInputWithLabel
          label="이메일 주소"
          id="email"
          placeholder="abc@a.com"
        />
        <CommonInputWithLabel
          label="비밀번호"
          id="password"
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        />
        <Button className="w-full h-10 rounded-2xl mt-3">로그인</Button>
      </form>
      <div className="flex gap-1 justify-center text-[13px] mt-4">
        <p className="text-gray-2">파크메이트 계정이 없으신가요?</p>
        <Link href="sign-up" className="font-semibold">
          회원가입하기
        </Link>
      </div>
    </PaddedLayout>
  );
}
