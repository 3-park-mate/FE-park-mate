import { GnbMenuType } from '@/types/GnbMenuType';
import ParkingMarkerIcon from '@repo/ui/components/icon/ParkingMarkerIcon';
import { Bookmark, Home, MessageSquareText, User } from 'lucide-react';

export const gnbMenuData: GnbMenuType[] = [
  {
    link: '/',
    icon: Home,
  },
  {
    link: '/my-reservation',
    icon: Bookmark,
  },
  {
    link: '/map-page',
    icon: ParkingMarkerIcon,
    main: true,
  },
  {
    link: '/chat',
    icon: MessageSquareText,
  },
  {
    link: '/my-page',
    icon: User,
  },
];
