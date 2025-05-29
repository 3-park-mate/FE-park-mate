import { GnbMenuType } from '@/types/GnbMenuType';
import ParkingMarkerIcon from '@repo/ui/components/icon/ParkingMarkerIcon';
import { Bookmark, Home, MessageSquareText, User } from 'lucide-react';

export const gnbMenuData: GnbMenuType[] = [
  {
    id: '/',
    link: './',
    icon: Home,
  },
  {
    id: './my-reservation',
    link: './my-reservation',
    icon: Bookmark,
  },
  {
    id: '/map-page',
    link: './map-page',
    icon: ParkingMarkerIcon,
    main: true,
  },
  {
    id: '/chat',
    link: './chat',
    icon: MessageSquareText,
  },
  {
    id: '/my-page',
    link: '/my-page',
    icon: User,
  },
];
