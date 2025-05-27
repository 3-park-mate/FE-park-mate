import {
  CommonButton,
  FixedBottomSection,
} from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';

export default function SignUpWelcome({ onNext }: { onNext?: () => void }) {
  return (
    <FixedBottomSection>
      <h1 className="font-extrabold text-3xl">
        파크메이트가
        <br />
        최적의 조건의 주차장을
        <br />
        실시간 안내해 드립니다.
      </h1>
      {/* <Link
        href="/target"
        className={`${buttonVariants({ variant: 'default' })} w-full h-11 rounded-2xl bg-secondary mt-5`}
      >
        로그인하기
      </Link> */}
      <CommonButton className="bg-secondary mt-5" onClick={onNext}>
        회원가입
      </CommonButton>
      <div className="flex gap-1 justify-center text-[13px] mt-4">
        <p className="text-gray-2">이미 파크메이트 계정이 있으신가요?</p>
        <Link href="sign-in" className="font-semibold text-secondary">
          로그인하기
        </Link>
      </div>
    </FixedBottomSection>
  );
}
