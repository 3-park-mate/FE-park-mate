import { buttonVariants } from '@repo/ui/components/base/button';
import ToggleWelcomeSheet from '../auth/ToggleWelcomeSheet';
import Link from 'next/link';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function HomeGuestSection() {
  return (
    <PaddedSection className="py-10 space-y-3">
      <p className="text-center text-gray-700 text-sm">
        지금 로그인하고 주차장을 탐색해 보세요.
      </p>
      <section className="flex flex-col">
        <Link
          href="/sign-in"
          className={`${buttonVariants({ variant: 'default' })} h-11`}
        >
          로그인하기
        </Link>
        <ToggleWelcomeSheet />
      </section>
    </PaddedSection>
  );
}
