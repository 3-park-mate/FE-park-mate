import {
  HomeMenuDataType,
  MyPageMenuDataType,
  ParkingDatailTabMenuType,
} from '@/types/initialDataTypes';

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
    href: 'my-car',
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

export const progressBarStatusMap = [
  {
    threshold: 100,
    label: '초과사용중',
    remainingText: '시간이 초과되었습니다.',
    labelColor: 'text-red-500',
    progressColor: '[&>div]:bg-red-1',
    remainingColor: 'text-red-1',
  },
  {
    threshold: 90,
    label: '이용종료 임박',
    remainingText: '곧 이용시간이 종료됩니다.',
    labelColor: 'text-purple-1',
    progressColor: '[&>div]:bg-purple-1',
    remainingColor: 'text-purple-1',
  },
  {
    threshold: 0,
    label: '이용중',
    remainingText: '1시간 23분 남음',
    labelColor: 'text-primary',
    progressColor: '[&>div]:bg-primary',
    remainingColor: 'text-gray-dark-2',
  },
];

export const favoritesSortMenu = [
  { label: '최신순', value: 'latest' },
  { label: '별점 높은순', value: 'high-rate' },
  { label: '가격 높은순', value: 'high-price' },
  { label: '가격 낮은순', value: 'low-price' },
];

export const parkingDetailTabMenus: ParkingDatailTabMenuType[] = [
  { label: '정보', id: 'info' },
  { label: '주차장 옵션', id: 'options' },
  { label: '주차장 사진', id: 'images' },
  { label: '방문자 리뷰', id: 'reviews' },
];
