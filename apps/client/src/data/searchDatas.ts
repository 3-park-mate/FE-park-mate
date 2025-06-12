import { TabMenuWithIconType } from '@/types/searchDataTypes';
import { MapPinnedIcon, ParkingCircleIcon } from 'lucide-react';

export const searchMenuListData: TabMenuWithIconType[] = [
  {
    id: 'search-location',
    href: '/search-location',
    title: '위치',
    icon: MapPinnedIcon,
  },
  {
    id: 'search-parkinglot',
    href: '/search-parkinglot',
    title: '주차장',
    icon: ParkingCircleIcon,
  },
];
