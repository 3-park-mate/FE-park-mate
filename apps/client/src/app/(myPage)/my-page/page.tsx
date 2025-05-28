import MenuLinkList from '@/components/common/MenuLinkList';
import PageHeader from '@/components/layouts/PageHeader';
import UserInfo from '@/components/pages/myPage/UserInfo';
import { myPageMenus } from '@/data/initialDatas';

export default function page() {
  return (
    <>
      <PageHeader title="마이페이지" className="bg-gray-light-1" />
      <main>
        <UserInfo />
        <MenuLinkList menus={myPageMenus} />
      </main>
    </>
  );
}
