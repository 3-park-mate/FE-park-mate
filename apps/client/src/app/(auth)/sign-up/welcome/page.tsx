import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <PaddedSection className="mt-38 text-center flex flex-col items-center justify-center gap-2">
        <h1 className="text-28px font-bold">🎉 환영합니다!</h1>
        <p className="text-15px text-gray-2">
          파크메이트에 합류해 주셔서 감사합니다.
          <br />
          지금 바로 내 차량을 등록해 보세요.
        </p>
        <CommonButton className="mt-14">내 차량 등록 바로가기</CommonButton>
        <Link href="/" className="text-13px text-secondary underline">
          메인 홈으로 돌아가기
        </Link>
      </PaddedSection>
    </main>
  );
}
