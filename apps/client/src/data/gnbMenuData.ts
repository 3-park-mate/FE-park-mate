import { GnbMenuType } from '@/types/initialDataTypes';
import ParkingMarkerIcon from '@repo/ui/components/icon/ParkingMarkerIcon';
import { Bookmark, Home, MessageSquareText, User } from 'lucide-react';

export const gnbMenuData: GnbMenuType[] = [
  {
    menuName: '홈',
    link: '/',
    icon: Home,
  },
  {
    menuName: '즐겨찾기',
    link: '/my-reservation',
    icon: Bookmark,
  },
  {
    menuName: '지도',
    link: '/map-page',
    icon: ParkingMarkerIcon,
    main: true,
  },
  {
    menuName: '채팅',
    link: '/chat',
    icon: MessageSquareText,
  },
  {
    menuName: 'MY',
    link: '/my-page',
    icon: User,
  },
];
