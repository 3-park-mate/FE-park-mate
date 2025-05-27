import { HomeMenuDataType, MyPageMenuDataType } from '@/types/initialDataTypes';

export const menuItems: HomeMenuDataType[] = [
  {
    icon: '/icon/star-icon-fill.svg',
    label: '즐겨찾기',
    href: '#',
  },
  {
    icon: '/icon/user-icon-fill.svg',
    label: '마이페이지',
    href: '#',
  },
  {
    icon: '/icon/chat-icon-fill.svg',
    label: '채팅',
    href: '#',
  },
  {
    icon: '/icon/rsv-icon-fill.svg',
    label: 'My예약',
    href: '#',
  },
];

export const myPageMenus: MyPageMenuDataType[] = [
  {
    label: '회원정보 수정',
    href: '#',
  },
  {
    label: '내 차량',
    href: '#',
  },
  {
    label: '주차권',
    href: '#',
  },
  {
    label: '구매 내역',
    href: '#',
  },
  {
    label: '호스트 등록',
    href: '#',
  },
];
