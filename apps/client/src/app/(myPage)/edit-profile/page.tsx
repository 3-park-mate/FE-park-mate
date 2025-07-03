import { getUserInfoData } from '@/actions/user/user-service';
import PageHeader from '@/components/layouts/PageHeader';
import EditProfileForm from '@/components/pages/myPage/editProfile/EditProfileForm';
import { UserInfoDataType } from '@/types/userDataTypes';

export default async function page() {
  const { data: userData } = (await getUserInfoData()) as {
    success: true;
    data: UserInfoDataType;
  };

  return (
    <>
      <PageHeader title="회원정보 수정" />
      <main>
        <EditProfileForm userData={userData} />
      </main>
    </>
  );
}
