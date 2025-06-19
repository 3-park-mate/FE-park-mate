import HostLogo from '@/components/common/HostLogo';
import PageHeader from '@/components/layouts/PageHeader';
import SignInBottomNotice from '@/components/pages/auth/signIn/SignInBottomNotice';
import SignInForm from '@/components/pages/auth/signIn/SignInForm';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <PageHeader title="로그인" />
      <main className="flex flex-col items-center">
        <section className="flex flex-col items-center justify-center h-48 pt-10">
          <HostLogo size="lg" />
          <p className="text-sm text-gray-3">관리자 전용 로그인 페이지</p>
        </section>
        <Suspense fallback={<div></div>}>
          <SignInForm />
        </Suspense>
        <SignInBottomNotice />
      </main>
    </>
  );
}
