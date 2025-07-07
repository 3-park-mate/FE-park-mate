import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';

export default function SignInBottomNotice() {
  return (
    <PaddedSection className="w-full">
      <div className="flex gap-1 justify-center text-13px mt-4">
        <p className="text-gray-2">계정이 없으신가요?</p>
        <Link
          href="/sign-up"
          className="font-semibold cursor-pointer text-secondary"
        >
          호스트 등록하기
        </Link>
      </div>
      <ul className="text-13px text-gray-2 list-disc pl-5 mt-8">
        <li>
          해당 페이지는 <b>관리자 전용</b> 로그인 페이지입니다.
        </li>
        <li>
          <a
            href="https://parkmate.shop"
            className="text-secondary font-semibold underline"
          >
            파크메이트 서비스 바로가기
          </a>
        </li>
      </ul>
    </PaddedSection>
  );
}
