import PageHeader from '@/components/layouts/PageHeader';
import SignUpFunnel from '@/components/pages/auth/signUp/SignUpFunnel';

export default function page() {
  return (
    <>
      <PageHeader title="회원가입" type="form" />
      <main>
        <SignUpFunnel />
      </main>
    </>
  );
}
