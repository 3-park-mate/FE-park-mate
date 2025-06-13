import MenuLinkList from '@/components/common/MenuLinkList';
import SimpleHeader from '@/components/layouts/SimpleHeader';
import UserInfo from '@/components/pages/myPage/UserInfo';
import { myPageMenus } from '@/data/initialDatas';

export default function page() {
  return (
    <>
      <SimpleHeader className="bg-gray-light-1" title="마이페이지" />
      <main>
        <UserInfo />
        <MenuLinkList menus={myPageMenus} />
      </main>
    </>
  );
}
