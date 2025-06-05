import MenuLinkList from '@/components/common/MenuLinkList';
import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import UserInfo from '@/components/pages/myPage/UserInfo';
import { myPageMenus } from '@/data/initialDatas';

export default function page() {
  return (
    <>
      <HomeMainHeader
        className="bg-gray-light-1"
        title="마이페이지"
        type="backButton"
      />
      <main>
        <UserInfo />
        <MenuLinkList menus={myPageMenus} />
      </main>
    </>
  );
}
