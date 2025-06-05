import { GnbNavItemDataType } from '@/types/initialDataTypes';
import { Home, BarChart2, User, Car, MessageCircle } from 'lucide-react';

export const gnbNavItems: GnbNavItemDataType[] = [
  {
    label: '홈',
    href: '/',
    icon: Home,
  },
  {
    label: '내 주차장',
    href: '/my-parking-lot',
    icon: Car,
  },
  {
    label: '통계',
    href: '/stats',
    icon: BarChart2,
  },
  {
    label: '채팅',
    href: '/chat',
    icon: MessageCircle,
  },
  {
    label: '마이호스트',
    href: '/user',
    icon: User,
  },
];

export const myParkingLotSortMenu = [
  { label: '운영중', value: 'active' },
  { label: '운영준비중', value: 'pending' },
];
