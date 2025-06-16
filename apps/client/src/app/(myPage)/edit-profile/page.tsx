import PageHeader from '@/components/layouts/PageHeader';
import EditProfileForm from '@/components/pages/myPage/editProfile/EditProfileForm';

export default function page() {
  return (
    <>
      <PageHeader title="회원정보 수정" />
      <main>
        <EditProfileForm />
      </main>
    </>
  );
}
