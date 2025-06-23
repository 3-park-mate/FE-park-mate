import { GnbNavItemDataType } from '@/types/initialDataTypes';
import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';
import CanopyParkingIcon from '@repo/ui/components/icon/options/CanopyParkingIcon';
import CarKeyIcon from '@repo/ui/components/icon/options/CarKeyIcon';
import CCTVIcon from '@repo/ui/components/icon/options/CCTVIcon';
import EVChargingIcon from '@repo/ui/components/icon/options/EVChargingIcon';
import GateIcon from '@repo/ui/components/icon/options/GateIcon';
import HandicappedParkingIcon from '@repo/ui/components/icon/options/HandicappedIcon';
import MotorcycleIcon from '@repo/ui/components/icon/options/MotorcycleIcon';
import ParkingAttendantIcon from '@repo/ui/components/icon/options/ParkingAttendantIcon';
import ReceiptIcon from '@repo/ui/components/icon/options/ReceiptIcon';
import TowerParkingIcon from '@repo/ui/components/icon/options/TowerParkingIcon';
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

export const parkingSettingsTabMenus = [
  { label: '운영 정보', id: 'operation' },
  { label: '주차장 정보', id: 'info' },
  { label: '주차면 정보', id: 'spot' },
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

export const parkingLotOptionIconMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  has_cctv: CCTVIcon,
  receipt_available: ReceiptIcon,
  requires_key_deposit: CarKeyIcon,
  disabled_parking: HandicappedParkingIcon,
  is_tower_type: TowerParkingIcon,
  has_ev_charger: EVChargingIcon,
  motorcycle_parking: MotorcycleIcon,
  has_attendant: ParkingAttendantIcon,
  has_canopy: CanopyParkingIcon,
  has_barrier_gate: GateIcon,
};

export const bankList = [
  '국민',
  '신한',
  '우리',
  '하나',
  '기업',
  '농협',
  '카카오',
  '토스',
  'SC제일',
  '씨티',
  '부산',
  '대구',
  '광주',
  '전북',
  '경남',
  '제주',
];
