import { GnbNavItemDataType } from '@/types/initialDataTypes';
import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';
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

export const chargingTypes = [
  { key: 'AC_SINGLE', icon: ACSingleIcon, label: 'AC단상' },
  { key: 'AC_THREE_PHASE', icon: ACThreePhaseIcon, label: 'AC3상' },
  { key: 'DC_CHADEMO', icon: DCChademoIcon, label: 'DC차데모' },
  { key: 'DC_COMBO', icon: DCComboIcon, label: 'DC콤보' },
];

export const parkingSpotTypes = [
  {
    src: '/img/small-car.webp',
    alt: 'Small Car',
    label: '경차',
    parkingSpotType: 'SMALL',
  },
  {
    src: '/img/compact-car.webp',
    alt: 'Compact Car',
    label: '소형차',
    parkingSpotType: 'COMPACT',
  },
  {
    src: '/img/standard-car.png',
    alt: 'Standard Car',
    label: '중형차',
    parkingSpotType: 'STANDARD',
  },
  {
    src: '/img/large-car.jpg',
    alt: 'Large Car',
    label: '대형차',
    parkingSpotType: 'LARGE',
  },
];
