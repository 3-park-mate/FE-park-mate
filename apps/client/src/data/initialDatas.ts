import {
  HomeMenuDataType,
  MyPageMenuDataType,
  ParkingDatailTabMenuType,
} from '@/types/initialDataTypes';
import { ParkingSpotTypeWithEV } from '@/types/parkingDataTypes';
import { ReservationStatus } from '@/types/reservationDataTypes';
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
    href: 'edit-profile',
  },
  {
    label: '내 차량',
    href: 'my-car',
  },
  {
    label: '예약 내역',
    href: 'my-reservations',
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

export const chargingTypes = [
  { key: 'AC_SINGLE', icon: ACSingleIcon, label: 'AC단상' },
  { key: 'AC_THREE_PHASE', icon: ACThreePhaseIcon, label: 'AC3상' },
  { key: 'DC_CHADEMO', icon: DCChademoIcon, label: 'DC차데모' },
  { key: 'DC_COMBO', icon: DCComboIcon, label: 'DC콤보' },
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

export const statusBadgeMap: Record<
  ReservationStatus,
  { label: string; className: string }
> = {
  WAITING: {
    label: '예약 대기',
    className:
      'bg-white border border-primary text-primary-dark-50 font-medium',
  },
  CONFIRMED: {
    label: '예약 확정',
    className: 'bg-primary text-white font-medium',
  },
  CANCELLED: {
    label: '예약 취소',
    className: 'bg-white border border-red-1 text-red-1 font-medium',
  },
  EXPIRED: {
    label: '예약 만료',
    className: 'bg-gray-1 text-black font-medium',
  },
  IN_USE: {
    label: '사용 중',
    className: 'bg-blue-500 text-white font-medium',
  },
  COMPLETED: {
    label: '사용 완료',
    className: 'bg-green-500 text-white font-medium',
  },
};

export const SelectParkingSpotCardMap: Record<
  ParkingSpotTypeWithEV,
  {
    label: string;
    selectedClass: string;
    unselectedClass: string;
  }
> = {
  EV: {
    label: '전기차',
    selectedClass: 'bg-green-gray/30 ring-green text-green-700 shadow-lg',
    unselectedClass: 'bg-green-gray/30 border-gray-1 text-gray-2',
  },
  SMALL: {
    label: '경차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-none text-gray-2',
  },
  COMPACT: {
    label: '소형차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-gray-1 text-gray-2',
  },
  STANDARD: {
    label: '중형차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-gray-1 text-gray-2',
  },
  LARGE: {
    label: '대형차',
    selectedClass: 'bg-secondary-gray/40  ring-secondary text-secondary-50',
    unselectedClass: 'bg-secondary-gray/40 border-gray-1 text-gray-2',
  },
};

export const ParkingSpotLabelMap: Record<
  ParkingSpotTypeWithEV,
  { label: string }
> = {
  EV: { label: '전기차' },
  SMALL: { label: '경차' },
  COMPACT: { label: '소형차' },
  STANDARD: { label: '중형차' },
  LARGE: { label: '대형차' },
};
